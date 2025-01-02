import { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchIndexPrice, fetchIndexAverage } from "api/Flow/Index_api";
import { ChartData } from "types/index/chart";

export const useIndex = () => {
  const [selectedIndex, setSelectedIndex] = useState<string[]>([]);
  const [indexData, setIndexData] = useState<ChartData[]>([]);
  const queryClient = useQueryClient();
  const handleSelectedIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedIndex((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    const previousSelectedIndex =
      queryClient.getQueryData<string[]>(["selectedIndex"]) || [];
    const existingNames = new Set(indexData.map((item) => item.name));
    const addedIndices = selectedIndex.filter(
      (index) =>
        !previousSelectedIndex.includes(index) && !existingNames.has(index)
    );
    addedIndices.forEach(async (index) => {
      if (index.length > 0) {
        try {
          const data = await fetchIndexPrice(index);
          setIndexData((prev) => [...prev, { name: index, data: data }]);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, [selectedIndex, queryClient]);

  return { indexData, selectedIndex, handleSelectedIndex };
};
