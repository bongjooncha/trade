import React from "react";
import styles from "../style/index.module.css";
import { formatNumber } from "utils/init";
import { CoinFuturePosition } from "types/coin";

interface FutureTableTotalProps {
  data: CoinFuturePosition[];
}

const FutureTableTotal = ({ data }: FutureTableTotalProps) => {
  const totalProfit = data.reduce((acc, item) => acc + item.unrealizedPL, 0);
  const totalMargin = data.reduce(
    (acc, item) => acc + item.marginSize * item.leverage,
    0
  );

  return (
    <h5 className={styles.total}>
      <div>
        총 포지션 가치 :{" "}
        {formatNumber(
          data.reduce((acc, item) => acc + item.marginSize * item.leverage, 0)
        )}{" "}
        USDT
      </div>
      <div>
        총익: {formatNumber(totalProfit)}{" "}
        <span
          className={styles.small}
          style={{
            color: totalProfit > 0 ? "pink" : "skyblue",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          ({formatNumber((totalProfit / totalMargin) * 100)}%)
        </span>
        {"   "}USDT
      </div>
    </h5>
  );
};

export default FutureTableTotal;
