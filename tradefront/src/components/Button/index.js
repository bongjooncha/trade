import React, { useState } from "react";
import axios from "axios";
import Accordion from "../Accordion";

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState("");
  const [tickers, setTickers] = useState([]);

  const handleMarketChange = async (e) => {
    const market = e.target.value;
    setSelectedMarket(market);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BUILD_BASE_URL}/tickers`,
        {
          market: market,
        }
      );
      setTickers(response.data);
    } catch (error) {
      console.error("Error fetching tickers:", error);
    }
  };

  return (
    <div>
      <h1>Market Tickers</h1>
      <div>
        <label>
          <input
            type="radio"
            value="KRW"
            checked={selectedMarket === "KRW"}
            onChange={handleMarketChange}
          />
          KRW
        </label>
        <label>
          <input
            type="radio"
            value="BTC"
            checked={selectedMarket === "BTC"}
            onChange={handleMarketChange}
          />
          BTC
        </label>
        <label>
          <input
            type="radio"
            value="USDT"
            checked={selectedMarket === "USDT"}
            onChange={handleMarketChange}
          />
          USDT
        </label>
      </div>
      <Accordion tickers={tickers} />
    </div>
  );
};

export default App;
