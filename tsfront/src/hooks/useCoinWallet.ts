import { useState, useEffect } from "react";
import {
  fetchBitgetPositions,
  fetchBitgetWalletBalance,
} from "api/Coin/Bitget/Bitget_api";
import {
  fetchBinanceFuturePositions,
  fetchBinanceWalletBalance,
} from "api/Coin/Binance/Binance_api";
import { CoinFuturePositionProps, CoinWalletBalanceProps } from "types/coin";

interface UseCoinWallet {
  bitgetPositions: CoinFuturePositionProps[];
  walletBitgetBalance: CoinWalletBalanceProps;
  binancePositions: CoinFuturePositionProps[];
  walletBinanceBalance: CoinWalletBalanceProps;
}

function useCoinWallet(): UseCoinWallet {
  const [bitgetPositions, setBitgetPositions] = useState<
    CoinFuturePositionProps[]
  >([]);
  const [walletBitgetBalance, setWalletBitgetBalance] =
    useState<CoinWalletBalanceProps>({
      free: 0,
      used: 0,
      total: 0,
    });

  const [binancePositions, setBinancePositions] = useState<
    CoinFuturePositionProps[]
  >([]);
  const [walletBinanceBalance, setWalletBinanceBalance] =
    useState<CoinWalletBalanceProps>({
      free: 0,
      used: 0,
      total: 0,
    });

  useEffect(() => {
    // BITGET 데이터 fetching
    fetchBitgetPositions().then((res) =>
      setBitgetPositions(res as CoinFuturePositionProps[])
    );
    fetchBitgetWalletBalance("future").then((res) =>
      setWalletBitgetBalance(res as CoinWalletBalanceProps)
    );

    // BINANCE 데이터 fetching
    fetchBinanceFuturePositions().then((res) =>
      setBinancePositions(res as CoinFuturePositionProps[])
    );
    fetchBinanceWalletBalance("future").then((res) =>
      setWalletBinanceBalance(res as CoinWalletBalanceProps)
    );
  }, []);

  return {
    bitgetPositions,
    walletBitgetBalance,
    binancePositions,
    walletBinanceBalance,
  };
}

export default useCoinWallet;
