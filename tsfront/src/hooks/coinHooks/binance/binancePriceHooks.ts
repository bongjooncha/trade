import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import queryClient from "queryClient";
import {
  fetchBinanceFuturePositions,
  fetchBinanceWalletBalance,
} from "api/Coin/Binance/Binance_api";
import { connectWebSocket, disconnectWebSocket } from "api/websocket";

import { BiMarketDataProps } from "types/coin/binance/tickerProp";
import {
  CoinFuturePositionProps,
  CoinProps,
  CoinWalletBalanceProps,
} from "types/coin";

export const useBinanceWalletBalance = () => {
  const { data: positionsData, error: positionsError } = useQuery<
    CoinFuturePositionProps[]
  >({
    queryKey: ["binanceFuturePositions"],
    queryFn: fetchBinanceFuturePositions,
  });

  const { data: walletBalanceData, error: walletBalanceError } =
    useQuery<CoinWalletBalanceProps>({
      queryKey: ["binanceFutureWalletBalance"],
      queryFn: () => fetchBinanceWalletBalance("future"),
    });

  const [coins, setCoins] = useState<string[]>([]);
  const [prices, setPrices] = useState<CoinProps[]>([]);

  useEffect(() => {
    if (positionsData) {
      setCoins(positionsData.map((position) => position.symbol.toLowerCase()));
    }
  }, [positionsData]);

  useEffect(() => {
    if (coins.length === 0) return;
    const ws = connectWebSocket(
      "wss://fstream.binance.com/ws",
      "binancewebsocket",
      queryClient
    );
    const params = coins.map((coin) => `${coin}@markPrice`);
    if (ws) {
      ws.onopen = () => {
        const message = {
          method: "SUBSCRIBE",
          params: params,
          id: 0,
        };
        ws.send(JSON.stringify(message));
      };
      ws.onmessage = async (event) => {
        try {
          const dataText = await event.data;
          const parsedData: BiMarketDataProps = JSON.parse(dataText);

          if (parsedData.s !== undefined) {
            setPrices((prevData) => ({
              ...prevData,
              [parsedData.s]: [parsedData.p],
            }));
          }
        } catch (error) {
          console.error("데이터 파싱 오류:", error);
        }
      };
    }

    return () => {
      disconnectWebSocket();
    };
  }, [coins]);

  return {
    walletBalance: walletBalanceData,
    positions: positionsData,
    prices,
    positionsError,
    walletBalanceError,
  };
};
