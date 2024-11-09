import React from "react";

import Headnav from "components/Header";
import ExchangeChart from "pages/Home/ExchangeChart";
// import IndexChart from "./IndexChart";

function Home() {
  return (
    <div className="Home">
      <Headnav />

      <ExchangeChart />

      <br />
      {/* <IndexChart /> */}
      <br />
      <br />
      <br />
    </div>
  );
}

export default Home;
