import style from "../style/style.module.css";
import { numberWriter, delComma, addCommas } from "utils/NumberChange/index";

const LimitBuy = ({ orderPrice, inputValue }) => {
  return (
    <>
      <div className={style.order_price}>
        <a>매수가격</a>
        <textarea
          id="orderPrice"
          value={addCommas(orderPrice)}
          // onChange={handleChange}
          rows="1"
          cols="30"
        />
      </div>
      <div className={style.order_amount}>
        <a>주문수량</a>
        <textarea
          id="myTextarea"
          value={inputValue}
          // onChange={handleChange}
          rows="1"
          cols="30"
        />
      </div>
    </>
  );
};

export default LimitBuy;
