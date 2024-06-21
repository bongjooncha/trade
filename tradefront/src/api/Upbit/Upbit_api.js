import axios from "axios";

// 백에서 받아올때
const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;
// 업비트에서 받아올때
const UPBIT_URL = "https://api.upbit.com/";

export async function fetchAccount() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BUILD_BASE_URL}/upbit/wallet`
    );
    const rawData = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 마켓별 코인명(KRW,BTC,USDT)(flask)
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

// 현재 코인 가격(flask -> upbit로 바꿔야함)
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

// 캔들 데이터 가져오기
export async function fetchCandle(market, interval) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const [intervalUnit, intervalValue] = interval.split("/");

  try {
    const response = await axios.get(
      `${UPBIT_URL}v1/candles/${intervalUnit}/${intervalValue}?market=${market}&count=200`,
      options
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching candle data:", error);
    throw error;
  }
}
