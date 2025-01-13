import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import queryClient from "queryClient";
import {
  fetchBitgetPositions,
  fetchBitgetWalletBalance,
} from "api/Coin/Bitget/Bitget_api";
import { CoinFuturePositionProps, CoinWalletBalanceProps } from "types/coin";

export const useBitgetWalletBalance = (account: string) => {
  const { data: positionsData, error: positionsError } = useQuery<
    CoinFuturePositionProps[]
  >({
    queryKey: ["bitgetFuturePositions"],
    queryFn: () => fetchBitgetPositions(account),
  });
  const { data: walletBalanceData, error: walletBalanceError } =
    useQuery<CoinWalletBalanceProps>({
      queryKey: ["bitgetFutureWalletBalance"],
      queryFn: () => fetchBitgetWalletBalance(account, "future"),
    });

  return {
    walletBalance: walletBalanceData,
    positions: positionsData,
    positionsError,
    walletBalanceError,
  };
};
