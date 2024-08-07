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
    const walletPromises = response.data.map(async (item) => {
      let current_price;
      if (item.unit_currency === item.currency) {
        current_price = 1;
      } else {
        const market = `${item.unit_currency}-${item.currency}`;
        const currentPriceData = await fetchPrice(market);
        current_price = currentPriceData[0].trade_price;
      }
      return {
        name: item.currency,
        balance: parseFloat(item.balance),
        avg_buy_price: parseFloat(item.avg_buy_price),
        unit_currency: item.unit_currency,
        current_price: parseFloat(current_price),
        total_price: parseFloat(item.balance) * parseFloat(current_price),
      };
    });
    const wallet = await Promise.all(walletPromises);
    return wallet;
  } catch (error) {
    console.error("Error fetchAccount data:", error);
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

/*현재 코인 상태(upbit)
fetchPrice("KRW-ZRO") = {
  "market": "KRW-ZRO",
  "trade_date": "20240624",
  "trade_time": "081556",
  "trade_date_kst": "20240624",
  "trade_time_kst": "171556",
  "trade_timestamp": 1719216956529,
  "opening_price": 3964,
  "high_price": 4048,
  "low_price": 3700,
  "trade_price": 3765,
  "prev_closing_price": 3963,
  "change": "FALL",
  "change_price": 198,
  "change_rate": 0.0499621499,
  "signed_change_price": -198,
  "signed_change_rate": -0.0499621499,
  "trade_volume": 207.50929224,
  "acc_trade_price": 18726743618.60102,
  "acc_trade_price_24h": 52713203776.61637,
  "acc_trade_volume": 4845785.26423683,
  "acc_trade_volume_24h": 13041099.16849705,
  "highest_52_week_price": 7295,
  "highest_52_week_date": "2024-06-20",
  "lowest_52_week_price": 3000,
  "lowest_52_week_date": "2024-06-20",
  "timestamp": 1719216956553
} */
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

// 매수 매도 function
// orderType: 시장, 지정, market: 코인-시장, price:가격 , number:갯수
async function sendOrder(orderType, market, price, number) {
  try {
    const endpoint = `${BASE_URL}/upbit/${orderType}_order`;
    const data = { market, number };
    if (orderType === "limit") {
      data.price = price;
    }
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error sending ${orderType} order:`, error);
    throw error;
  }
}

// 지정가 매수(flask)
export async function orderLimitBuy(market, price, number) {
  return sendOrder("buy_limit", market, price, number);
}

// 시장가 매수(flask)
export async function orderMarketBuy(market, number) {
  return sendOrder("buy_market", market, null, number);
}

// 지정가 매도(flask)
export async function orderLimitSell(market, price, number) {
  return sendOrder("sell_limit", market, price, number);
}

// 시장가 매도(flask)
export async function orderMarketSell(market, number) {
  return sendOrder("sell_market", market, null, number);
}
