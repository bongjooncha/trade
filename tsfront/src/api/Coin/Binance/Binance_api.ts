import axios from "axios";
import { CoinFuturePositionProps, CoinWalletBalanceProps } from "types/coin";

const BASE_URL = process.env.REACT_APP_PRIVATE_BACK_URL;

export const fetchBinanceWalletBalance = async (
  type: string
): Promise<CoinWalletBalanceProps> => {
  const response = await axios.get<CoinWalletBalanceProps>(
    `${BASE_URL}/binance/wallet/${type}`
  );
  return response.data;
};

export const fetchBinanceFuturePositions = async (): Promise<
  CoinFuturePositionProps[]
> => {
  const response = await axios.get<CoinFuturePositionProps[]>(
    `${BASE_URL}/binance/positions`
  );
  return response.data;
};

export const fetchBinanceFutureTs = async (coins: string[]) => {
  const response = await axios.get(`${BASE_URL}/binance/future_ts`, {
    params: {
      coins: coins,
    },
  });
  return response.data;
};
