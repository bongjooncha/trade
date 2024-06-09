import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

// 마켓별 코인명(KRW,BTC,USDT)
export async function fetchTickers(market) {
  try {
    const response = await axios.post(`${BASE_URL}/upbit/tickers`, {
      market: market,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}

// 현재 코인 가격
export async function fetchPrice(coin) {
  try {
    const response = await axios.post(`${BASE_URL}/upbit/current_price`, {
      market: coin,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching price:", error);
    throw error;
  }
}
