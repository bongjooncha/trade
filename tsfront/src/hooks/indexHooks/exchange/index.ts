import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIndexPrice, fetchIndexAverage } from "api/Flow/Index_api";

export const useExchange = () => {
  // baseCurrency
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const handleBaseCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseCurrency(e.target.value);
  };

  // selectedCurrencies
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "JPY",
    "KRW",
    "GBP",
    "CNY",
    "EUR",
  ]);
  const handleSelectedCurrencies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedCurrencies((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  if (baseCurrency === "USD") {
    const currencyPair = `${baseCurrency}${selectedCurrencies.join("")}`;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["exchange"],
    queryFn: () => {
      const indexPrice = fetchIndexPrice("data");
      const indexAverage = fetchIndexAverage("index");
      return { indexPrice, indexAverage };
    },
    enabled: false,
  });
  return {
    data,
    isLoading,
    error,
    baseCurrency,
    handleBaseCurrency,
    selectedCurrencies,
    handleSelectedCurrencies,
  };
};
