import React, { useState } from "react";
import Headnav from "components/Header/index";

import CurrentMarket from "components/CurrnetMarket/index";
import Trychart from "components/Chart/index";
import Order from "components/Order";

import style from "./style/Uptrade.module.css";

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
      <div className={style.trade_body}>
        <div className={style.trade_main}>
          <Trychart market={selectedMarket} />
          <Order market={selectedMarket} />
        </div>

        {/* <CurrentMarket
          current_markets={current_markets}
          onMarketChange={handleMarketChange}
        /> */}
      </div>
    </div>
  );
}

export default UpTrade;
