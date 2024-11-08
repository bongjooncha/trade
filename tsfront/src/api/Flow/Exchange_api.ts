import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

// 환율 가격
export async function fetchExchangePrice(country: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/index/exchange_rate/`,
      { table_name: country },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}

// 환율 평균
export async function fetchExchangeAverage(country: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/index/exchange_rate/avg`,
      { table_name: country },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}
