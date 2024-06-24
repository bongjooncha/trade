import axios from "axios";

// 백에서 받아올때
const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;
// 업비트에서 받아올때
const UPBIT_URL = "https://api.upbit.com/";

// 자산 확인 api(flask)
export async function fetchAccount() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BUILD_BASE_URL}/upbit/wallet`
    );
    return response.data;
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

// 현재 코인 가격(upbit)
export async function fetchPrice(coin) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  let url = `${UPBIT_URL}v1/ticker?markets=${coin}`;
  try {
    const response = await axios.get(url, options);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
}

// 코인 캔들(upbit)
export async function fetchCandle(market, intervalUnit, to = null) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  let url = `${UPBIT_URL}v1/candles/${intervalUnit}?market=${market}&count=200`;
  if (to) {
    url += `&to=${to}`;
  }

  try {
    const response = await axios.get(url, options);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching candle data:", error);
    throw error;
  }
}
