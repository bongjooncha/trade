import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

// Index 가격
export async function fetchIndexPrice(index) {
  try {
    const response = await axios.post(`${BASE_URL}/index/price`, {
      index: index,
    });
    return response.data;
  } catch (error) {
    console.errer("Error fetching tickers:", error);
    throw error;
  }
}

// Index 평균
export async function fetchIndexAverage(index) {
  try {
    const response = await axios.post(`${BASE_URL}/index/average`, {
      index: index,
    });
    return response.data;
  } catch (error) {
    console.errer("Error fetching tickers:", error);
    throw error;
  }
}
