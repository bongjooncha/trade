import axios from "axios";

const BASE_URL = process.env.REACT_APP_PRIVATE_BACK_URL;

export async function fetchBitgetWalletBalance(type: string) {
  const response = await axios.get(`${BASE_URL}/bitget/wallet/${type}`);
  return response.data;
}

export async function fetchBitgetPositions() {
  const response = await axios.get(`${BASE_URL}/bitget/positions`);
  return response.data;
}

export async function fetchBitgetOpenOrders() {
  const response = await axios.get(`${BASE_URL}/bitget/futures_orders`);
  return response.data;
}
