import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

// Index 가격
export async function fetchIndexPrice(index: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/index/index`,
      { table_name: index },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}

// Index 평균
export async function fetchIndexAverage(index: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/index/index/avg`,
      { table_name: index },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}
