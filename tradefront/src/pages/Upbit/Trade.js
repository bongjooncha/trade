import React from "react";
import Headnav from "components/Header/index";

import CurrentMarket from "components/CurrnetMarket/index";
import Chart from "components/Chart/index";
import "styles/Uptrade.css";

function UpTrade() {
  return (
    <div className="Home">
      <Headnav />
      <br />
      <br />
      <div className="trade_body">
        <Chart />
        <CurrentMarket />
      </div>
    </div>
  );
}

export default UpTrade;
