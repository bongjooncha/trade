import { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchIndexPrice, fetchIndexAverage } from "api/Flow/Index_api";
import { ChartData, PriceData, AverageData } from "types/index/chart";

interface CombinedData {
  priceData: PriceData;
  averageData: AverageData;
  processedData: number[];
}

export const useIndex = () => {
  const [selectedIndex, setSelectedIndex] = useState<string[]>([
    "^GSPC",
    "^NDX",
  ]);

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

  const queries = useQueries({
    queries: selectedIndex.map((index) => ({
      queryKey: ["indexData", index],
      queryFn: async () => {
        const [priceData, averageData] = await Promise.all([
          fetchIndexPrice(index),
          fetchIndexAverage(index),
        ]);

        const average = averageData[0]["AVG(Close)"];
        const processedData = priceData.map((item) => [
          Date.parse(item.Date),
          ((item.Close - average) / average) * 100,
        ]);
        return processedData;
      },
      enabled: selectedIndex.includes(index),
      staleTime: 12 * 60 * 60 * 1000, // 분 * 초 * 밀리초
    })),
  });

  const indexData: ChartData[] = useMemo(() => {
    return queries
      .filter((query) => query.status === "success" && query.data)
      .map((query, idx) => ({
        name: selectedIndex[idx],
        data: query.data,
      }));
  }, [selectedIndex]);

  return { indexData, selectedIndex, handleSelectedIndex };
};
