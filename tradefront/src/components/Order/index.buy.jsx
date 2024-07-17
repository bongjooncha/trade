import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { numberWriter, delComma, addCommas } from "utils/NumberChange/index";
import style from "./style/style.module.css";

// coin은 fetchPrice(market)으로 받아온 데이터
const OrderBuy = (data) => {
  const [orderType, setOrderType] = useState("지정가"); //   주문 유형
  const [inputValue, setInputValue] = useState(""); //   주문 수량
  const [orderPrice, setOrderPrice] = useState(data.market.trade_price); //   구매 가격(초기는 시장가)

  if (!data.market || !data.wallet) return null;

  const topRadioButton = ["지정가", "시장가", "자동매매"];
  // 보유 원화
  let krw;
  if (!data.wallet) {
  } else {
    krw = addCommas(
      data.wallet.find((item) => item.name === "KRW").total_price
    );
  }

  //   주문type 변수 및 작성
  const handleOrderType = (e) => {
    setOrderType(e.target.value);
  };

  //   가격 변수 및 작성;
  const handleChange = (e) => {
    const value = e.target.value;
    const formattedValue = numberWriter(value);
    setInputValue(formattedValue);
  };

  return (
    <div className={style.orderBook}>
      <h2>{data.market.market}</h2>
      <div className={style.order_type}>
        <a>주문유형</a>
        {topRadioButton.map((item, index) => (
          <label key={index}>
            <input
              type="radio"
              name="options"
              value={item}
              checked={orderType === item}
              onChange={handleOrderType}
            ></input>
            {item}
          </label>
        ))}
      </div>
      <div className={style.wallet_balance}>
        <a>주문 가능</a>
        <a>{krw}원</a>
      </div>
      {orderType === "지정가" && (
        <>
          <div className={style.order_price}>
            <a>매수가격</a>
            <textarea
              id="orderPrice"
              value={addCommas(orderPrice)}
              onChange={handleChange}
              rows="1"
              cols="30"
            />
          </div>
          <div className={style.order_amount}>
            <a>주문수량</a>
            <textarea
              id="myTextarea"
              value={inputValue}
              onChange={handleChange}
              rows="1"
              cols="30"
            />
          </div>
        </>
      )}
      <div className={style.order_value}>
        <a>주문총액</a>
        {orderType === "지정가" ? (
          <>
            {inputValue}
            <br />
            {addCommas(parseFloat(delComma(inputValue)) * 3)}
          </>
        ) : (
          // 시장가일 때는 주문총액만 보여줌
          <>{addCommas(parseFloat(delComma(inputValue)) * 3)}</>
        )}
      </div>
      <div className={style.order_button}>
        <button>초기화</button>
        {/* <button onClick={handleOrder}>매수</button> */}
      </div>
    </div>
  );
};

export default OrderBuy;
