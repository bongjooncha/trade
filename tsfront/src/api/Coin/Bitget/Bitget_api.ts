import axios from "axios";
import { CoinFuturePositionProps, CoinWalletBalanceProps } from "types/coin";

const BASE_URL = process.env.REACT_APP_PRIVATE_BACK_URL;

export const fetchBitgetWalletBalance = async (
  account: string,
  type: string
): Promise<CoinWalletBalanceProps> => {
  const response = await axios.get<CoinWalletBalanceProps>(
    `${BASE_URL}/bitget/wallet/${account}/${type}`
  );
  return response.data;
};

export const fetchBitgetPositions = async (
  account: string
): Promise<CoinFuturePositionProps[]> => {
  const response = await axios.get<CoinFuturePositionProps[]>(
    `${BASE_URL}/bitget/positions/${account}`
  );
  return response.data;
};

export async function fetchBitgetOpenOrders(account: string) {
  const response = await axios.get(
    `${BASE_URL}/bitget/futures_orders/${account}`
  );
  return response.data;
}
