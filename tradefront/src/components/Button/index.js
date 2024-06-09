import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";

function MarketButton() {
  const markets = ["KRW", "BTC", "USDT"];
  const [selectedMarket, setSelectedMarket] = useState("KRW");
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    // 초기 렌더링 시에 선택된 마켓에 대한 티커를 가져오도록 설정
    fetchTickers(selectedMarket);
  }, [selectedMarket]);

  const fetchTickers = async (market) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BUILD_BASE_URL}/upbit/tickers`,
        {
          market: market,
        }
      );
      setTickers(
        response.data.map((market_coin) =>
          market_coin.replace(`${market}-`, "")
        )
      );
    } catch (error) {
      console.error("Error fetching tickers:", error);
    }
  };

  const fetchPrice = async (ticker) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BUILD_BASE_URL}/upbit/current_price`,
        {
          market: selectedMarket,
          ticker: ticker,
        }
      );
      return response.data.toLocaleString();
    } catch (error) {
      console.error("Error fetching price:", error);
      return "N/A";
    }
  };

  const handleMarketChange = async (market) => {
    setSelectedMarket(market);
  };

  return (
    <Tabs
      id="market-tabs"
      activeKey={selectedMarket}
      onSelect={handleMarketChange}
      className="mb-3"
    >
      {markets.map((market) => (
        <Tab key={market} eventKey={market} title={market}>
          {tickers.map((ticker) => (
            <div key={ticker}>{ticker}</div>
          ))}
        </Tab>
      ))}
    </Tabs>
  );
}

export default MarketButton;
