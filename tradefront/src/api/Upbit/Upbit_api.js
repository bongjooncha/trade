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

// 현재 코인 상태(upbit)
// example = {
//   "market": "KRW-ZRO",
//   "trade_date": "20240624",
//   "trade_time": "081556",
//   "trade_date_kst": "20240624",
//   "trade_time_kst": "171556",
//   "trade_timestamp": 1719216956529,
//   "opening_price": 3964,
//   "high_price": 4048,
//   "low_price": 3700,
//   "trade_price": 3765,
//   "prev_closing_price": 3963,
//   "change": "FALL",
//   "change_price": 198,
//   "change_rate": 0.0499621499,
//   "signed_change_price": -198,
//   "signed_change_rate": -0.0499621499,
//   "trade_volume": 207.50929224,
//   "acc_trade_price": 18726743618.60102,
//   "acc_trade_price_24h": 52713203776.61637,
//   "acc_trade_volume": 4845785.26423683,
//   "acc_trade_volume_24h": 13041099.16849705,
//   "highest_52_week_price": 7295,
//   "highest_52_week_date": "2024-06-20",
//   "lowest_52_week_price": 3000,
//   "lowest_52_week_date": "2024-06-20",
//   "timestamp": 1719216956553
// }
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
