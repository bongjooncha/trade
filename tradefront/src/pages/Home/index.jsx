import React from "react";

import Headnav from "components/Header/index";
import ExchangeChart from "components/ExchangeChart";

function Home() {
  return (
    <div className="Home">
      <Headnav />
      <ExchangeChart />
    </div>
  );
}

export default Home;
