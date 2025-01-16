import axios from "axios";
import { PriceData, AverageData } from "../../types/index/chart";

const BASE_URL = process.env.REACT_APP_PUBLIC_BACK_URL;

// Index 가격
export const fetchIndexPrice = async (index: string): Promise<PriceData> => {
  const response = await axios.post<PriceData>(
    `${BASE_URL}/index/index`,
    { table_name: index },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

// Index 평균
export const fetchIndexAverage = async (
  index: string
): Promise<AverageData> => {
  const response = await axios.post<AverageData>(
    `${BASE_URL}/index/index/avg`,
    { table_name: index },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
