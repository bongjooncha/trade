import React, { useState } from "react";
import Headnav from "components/Header/index";

import CurrentMarket from "components/CurrnetMarket/index";
import Trychart from "components/Chart/index";

import "./style/Uptrade.css";

function UpTrade() {
  const current_markets = ["KRW", "BTC", "USDT"];
  const [selectedMarket, setSelectedMarket] = useState("KRW-BTC");
  const handleMarketChange = (newMarket) => {
    setSelectedMarket(newMarket);
  };

  return (
    <div className="Home">
      <Headnav />
      <br />
      <br />
      <div className="trade_body">
        <Trychart market={selectedMarket} />
        {/* <CurrentMarket
          current_markets={current_markets}
          onMarketChange={handleMarketChange}
        /> */}
      </div>
    </div>
  );
}

export default UpTrade;
