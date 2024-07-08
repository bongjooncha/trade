import React, { useState, useEffect } from "react";
import { numberWriter, delComma, addCommas } from "utils/NumberChange/index";
import {
  fetchAccount,
  orderLimitBuy,
  orderMarketBuy,
} from "api/Upbit/Upbit_api";
import style from "./style/style.module.css";

// coin은 fetchPrice(market)으로 받아온 데이터
const OrderBuy = (coin) => {
  // 현재 보고 있는 market
  const [marketType, setMarketType] = useState(coin.coin.market);
  //   주문type 변수
  const [orderType, setOrderType] = useState("지정가");
  //   가격 변수
  const [inputValue, setInputValue] = useState("");
  //   구매 가격
  const [orderPrice, setOrderPrice] = useState(coin.coin.trade_price);
  // 내잔고
  const [krwBalance, setKrwBalance] = useState(null);

  //    주문type 결정
  const handleOrderType = (e) => {
    setOrderType(e.target.value);
  };
  //   가격 작성
  const handleChange = (e) => {
    const value = e.target.value;
    const formattedValue = numberWriter(value);
    setInputValue(formattedValue);
  };
  // 주문 실행 함수
  const handleOrder = () => {
    const amount = parseFloat(delComma(inputValue));
    if (orderType === "지정가") {
      // 지정가 주문 실행
      orderLimitBuy(marketType, amount);
    } else if (orderType === "시장가") {
      // 시장가 주문 실행
      orderMarketBuy(marketType, amount);
    }
  };

  // 내 잔고 불러오기
  useEffect(() => {
    const getBalance = async () => {
      const data = await fetchAccount();
      const krwAccount = data.find((account) => account.currency === "KRW");
      if (krwAccount) {
        setKrwBalance(krwAccount.balance);
      }
    };
    getBalance();
  }, []);

  return (
    <div className={style.orderBook}>
      <h2>{marketType}</h2>
      <div className={style.order_type}>
        <a>주문유형</a>
        <label>
          <input
            type="radio"
            name="options"
            value="지정가"
            checked={orderType === "지정가"}
            onChange={handleOrderType}
          />
          지정가
        </label>
        <label>
          <input
            type="radio"
            name="options"
            value="시장가"
            checked={orderType === "시장가"}
            onChange={handleOrderType}
          />
          시장가
        </label>
      </div>
      <div className={style.wallet_balance}>
        <a>주문 가능</a>
        <a>{addCommas(Math.round(krwBalance * 10) / 10)}원</a>
      </div>
      {/* 지정가일 때만 매수가격 및 주문수량을 보여줌 */}
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
        <button onClick={handleOrder}>매수</button>
      </div>
    </div>
  );
};

export default OrderBuy;
