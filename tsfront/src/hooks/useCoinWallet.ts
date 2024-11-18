import { useState, useEffect } from "react";
import {
  fetchBitgetPositions,
  fetchBitgetWalletBalance,
} from "api/Coin/Bitget/Bitget_api";
import {
  fetchBinanceFuturePositions,
  fetchBinanceWalletBalance,
} from "api/Coin/Binance/Binance_api";
import { CoinFuturePosition } from "types/coin";

interface WalletBalance {
  free: number;
  used: number;
  total: number;
}

interface UseCoinWallet {
  bitgetPositions: CoinFuturePosition[];
  walletBitgetBalance: WalletBalance;
  binancePositions: CoinFuturePosition[];
  walletBinanceBalance: WalletBalance;
}

function useCoinWallet(): UseCoinWallet {
  const [bitgetPositions, setBitgetPositions] = useState<CoinFuturePosition[]>(
    []
  );
  const [walletBitgetBalance, setWalletBitgetBalance] = useState<WalletBalance>(
    {
      free: 0,
      used: 0,
      total: 0,
    }
  );

  const [binancePositions, setBinancePositions] = useState<
    CoinFuturePosition[]
  >([]);
  const [walletBinanceBalance, setWalletBinanceBalance] =
    useState<WalletBalance>({
      free: 0,
      used: 0,
      total: 0,
    });

  useEffect(() => {
    // BITGET 데이터 fetching
    fetchBitgetPositions().then((res) =>
      setBitgetPositions(res as CoinFuturePosition[])
    );
    fetchBitgetWalletBalance("future").then((res) =>
      setWalletBitgetBalance(res as WalletBalance)
    );

    // BINANCE 데이터 fetching
    fetchBinanceFuturePositions().then((res) =>
      setBinancePositions(res as CoinFuturePosition[])
    );
    fetchBinanceWalletBalance("future").then((res) =>
      setWalletBinanceBalance(res as WalletBalance)
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
