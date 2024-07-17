import React, { useState } from "react";
import OrderType from "../index.orderType";
import LimitBuy from "./index.limitBuy";

import { numberWriter, delComma, addCommas } from "utils/NumberChange/index";
import style from "../style/style.module.css";

// coin은 fetchPrice(market)으로 받아온 데이터
const OrderBuy = ({ market, wallet, orderLimitBuy, orderMarketBuy }) => {
  const [orderType, setOrderType] = useState("지정가"); //   주문 유형
  const [orderPrice, setOrderPrice] = useState(market.trade_price); //   구매 가격(초기는 시장가)
  const [inputValue, setInputValue] = useState("0"); //   주문 수량
  const [totalPrice, setTotalPrice] = useState(0);

  // 보유 원화
  let krw = wallet
    ? addCommas(wallet.find((item) => item.name === "KRW").total_price)
    : "";

  //   가격 변수 및 작성;
  const handleChange = (e) => {
    const value = e.target.value;
    const formattedValue = numberWriter(value);
    setInputValue(formattedValue);
  };

  const handleOrder = (e) => {
    if (orderType === "지정가") {
      orderLimitBuy(market.market, orderPrice, inputValue);
    } else {
      orderMarketBuy(market.market, totalPrice);
    }
  };

  return (
    <div className={style.orderBook}>
      <h2>{market.market}</h2>
      <OrderType orderType={orderType} setOrderType={setOrderType} />
      {/* 주문가능 */}
      <div className={style.wallet_balance}>
        <a>주문 가능</a>
        <strong>{krw}원</strong>
      </div>
      {orderType === "지정가" && (
        <LimitBuy orderPrice={orderPrice} inputValue={inputValue} />
      )}
      <div className={style.order_value}>
        <a>주문 총액</a>
        <a>{addCommas(parseFloat(delComma(inputValue)) * 3)}</a>
      </div>
      <div className={style.order_button}>
        <button>초기화</button>
        <button onClick={handleOrder}>매수</button>
      </div>
    </div>
  );
};

export default OrderBuy;
