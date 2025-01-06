import styles from "./style/index.module.css";
import { FutureTableAccordionTPSLProps } from "types/coin";
import { formatNumber } from "utils/init";

const FutureTableAccordionTPSL: React.FC<FutureTableAccordionTPSLProps> = ({
  openPrice,
  orders,
  type,
  amount,
}) => {
  if (orders.length === 0) return null;
  return (
    <div className={styles.accordionContent}>
      <div
        className={styles.title}
        style={{ color: type === "익절" ? "pink" : "skyblue" }}
      >
        {type}
      </div>
      {orders
        .sort((a, b) => a.triggerPrice - b.triggerPrice)
        .map((item, index) => (
          <div className={styles.accordionBodyItem}>
            <div className={styles.index}>{index + 1}</div>
            <div className={styles.price}>
              {type}가: {formatNumber(item.triggerPrice)}$
            </div>
            <div className={styles.amount}>
              {type} 물량:{" "}
              {item.amount !== null
                ? `${item.amount}개 ${type}`
                : `전체 ${type}`}
            </div>
            <div className={styles.amount}>
              손익:{" "}
              {item.amount !== null
                ? `${formatNumber(
                    item.amount * (item.triggerPrice - openPrice)
                  )}$`
                : `${formatNumber(amount * (item.triggerPrice - openPrice))}$`}
            </div>
            <button>주문 수정</button>
            <button>주문 취소</button>
          </div>
        ))}
    </div>
  );
};

export default FutureTableAccordionTPSL;
