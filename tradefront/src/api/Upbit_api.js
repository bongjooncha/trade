import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;
const UPBIT_URL = "https://api.upbit.com/";

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
// export async function fetchPrice(coin) {
//   const options = { method: "GET", headers: { accept: "application/json" } };

//   try {
//     const response = await fetch(
//       `${UPBIT_URL}v1/ticker?markets=${coin}`,
//       options
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching price:", error);
//     throw error;
//   }
// }

// 캔들 데이터 가져오기
export async function fetchCandle(market, interval) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const [intervalUnit, intervalValue] = interval.split("/");

  try {
    const response = await axios.get(
      `${UPBIT_URL}v1/candles/${intervalUnit}/${intervalValue}?market=${market}&count=100`,
      options
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching candle data:", error);
    throw error;
  }
}
