import style from "./style/style.module.css";

const OrderType = ({ orderType, setOrderType }) => {
  const topRadioButton = ["지정가", "시장가", "자동매매"];

  return (
    <div className={style.order_type}>
      <a>주문 유형</a>
      {topRadioButton.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            name="options"
            value={item}
            checked={orderType === item}
            onChange={(e) => setOrderType(e.target.value)}
          ></input>
          {item}
        </label>
      ))}
    </div>
  );
};

export default OrderType;
