import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Headnav from "components/Header/index";

import CurrentMarket from "components/CurrnetMarket/index";
import Trychart from "components/Chart/index";
import Order from "components/Order";

import style from "./style/Uptrade.module.css";
import {
  fetchAccount,
  fetchPrice,
  orderLimitBuy,
  orderLimitSell,
  orderMarketBuy,
  orderMarketSell,
} from "api/Coin/Upbit/Upbit_api";

function UpTrade() {
  const current_markets = ["KRW", "BTC", "USDT"];
  const [selectedMarket, setSelectedMarket] = useState("KRW-BTC");
  const handleMarketChange = (newMarket) => {
    setSelectedMarket(newMarket);
  };
  const { data: walletData } = useQuery({
    queryKey: ["walletData"],
    queryFn: fetchAccount,
  });
  const { data: marketData } = useQuery({
    queryKey: ["marketData"],
    queryFn: () => fetchPrice(selectedMarket),
  });
  let marketPrice;
  if (marketData) {
    const { market, trade_price } = marketData[0];
    marketPrice = { market, trade_price };
  }

  return (
    <div className="Home">
      <Headnav />
      <br />
      <br />
      <div className={style.trade_body}>
        <div className={style.trade_main}>
          <Trychart market={selectedMarket} />
          <Order
            market={marketPrice}
            wallet={walletData}
            orderLimitBuy={orderLimitBuy}
            orderLimitSell={orderLimitSell}
            orderMarketBuy={orderMarketBuy}
            orderMarketSell={orderMarketSell}
          />
        </div>
        {/* 
        <CurrentMarket
          current_markets={current_markets}
          onMarketChange={handleMarketChange}
        /> */}
      </div>
    </div>
  );
}

export default UpTrade;
