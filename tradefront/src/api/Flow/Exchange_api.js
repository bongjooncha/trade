import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

// 환율 가격
export async function fetchExchangePrice(country) {
  try {
    const response = await axios.post(`${BASE_URL}/exchange/price`, {
      country: country,
    });
    return response.data;
  } catch (error) {
    console.errer("Error fetching tickers:", error);
    throw error;
  }
}

// 환율 평균
export async function fetchExchangeAverage(country) {
  try {
    const response = await axios.post(`${BASE_URL}/exchange/average`, {
      country: country,
    });
    return response.data;
  } catch (error) {
    console.errer("Error fetching tickers:", error);
    throw error;
  }
}
