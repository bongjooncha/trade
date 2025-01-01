import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIndexPrice, fetchIndexAverage } from "api/Flow/Index_api";

export const useIndex = () => {
  const [selectedIndex, setSelectedIndex] = useState<string[]>([]);
  const [IndexData, setIndexData] = useState<any[]>([]);
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["index"],
    queryFn: () => {
      // const indexPrice = fetchIndexPrice("index");
      // const indexAverage = fetchIndexAverage("index");
      // return { indexPrice, indexAverage };
    },
  });
  return { data, isLoading, error, selectedIndex, handleSelectedIndex };
};
