import React from "react";
import Headnav from "components/Header/index";

import CurrentMarket from "components/CurrnetMarket/index";
import Chart from "components/Chart/index";
import "./style/Uptrade.css";

function UpTrade() {
  const current_markets = ["KRW", "BTC", "USDT"];

  return (
    <div className="Home">
      <Headnav />
      <br />
      <br />
      <div className="trade_body">
        <Chart />
        {/* <CurrentMarket current_markets={current_markets} /> */}
      </div>
    </div>
  );
}

export default UpTrade;
