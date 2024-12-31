import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIndexPrice, fetchIndexAverage } from "api/Flow/Index_api";

export const useExchange = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const handleBaseCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseCurrency(e.target.value);
  };

  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "JPY",
    "KRW",
    "GBP",
    "CNY",
    "EUR",
  ]);
  const handleSelectedCurrencies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrencies([...selectedCurrencies, e.target.value]);
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["index"],
    queryFn: () => {
      const indexPrice = fetchIndexPrice("index");
      const indexAverage = fetchIndexAverage("index");
      return { indexPrice, indexAverage };
    },
    enabled: false,
  });
  return {
    baseCurrency,
    isLoading,
    error,
    handleBaseCurrency,
    selectedCurrencies,
    handleSelectedCurrencies,
  };
};
