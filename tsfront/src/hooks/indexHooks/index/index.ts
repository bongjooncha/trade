import { useQuery } from "@tanstack/react-query";
import { fetchIndexPrice, fetchIndexAverage } from "api/Flow/Index_api";

export const useIndex = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["index"],
    queryFn: () => {
      const indexPrice = fetchIndexPrice("index");
      const indexAverage = fetchIndexAverage("index");
      return { indexPrice, indexAverage };
    },
  });
  return { data, isLoading, error };
};
