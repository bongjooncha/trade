import React from "react";
import { Accordion } from "react-bootstrap";
import styles from "../style/index.module.css";

import { CoinFuturePosition } from "types/coin";
import { formatNumber, formatTPSL } from "utils/init";

interface FutureTableBodyProps {
  data: CoinFuturePosition[];
}

const FutureTableBody = ({ data }: FutureTableBodyProps) => {
  return (
    <div className={styles.bodyRow}>
      {data.map((item) => (
        <div key={item.symbol} className={styles.row}>
          <div className={styles.type1}>{item.symbol}</div>
          <div
            className={styles.type2}
            style={{
              color: item.holdSide === "long" ? "pink" : "skyblue",
            }}
          >
            {item.holdSide}
          </div>
          <div className={styles.type3}>
            {formatNumber(item.marginSize * item.leverage) + "   "}
            USDT {"   "}
            <span className={styles.small}>(x {item.leverage})</span>
          </div>
          <div className={styles.type3}>
            {formatNumber(item.markPrice)} /{formatNumber(item.openPriceAvg)}
          </div>
          <div
            className={styles.type3}
            style={{
              color:
                item.unrealizedPL + item.achievedProfits > 0
                  ? "pink"
                  : "skyblue",
            }}
          >
            {formatNumber(item.unrealizedPL)}
            USDT
            <span className={styles.small}>
              ({formatNumber(item.unrealizedPL + item.achievedProfits)})
            </span>
          </div>
          <div className={styles.type1}>
            {formatTPSL(item.TP) === "-"
              ? "-"
              : formatNumber(
                  (Number(formatTPSL(item.TP)) - item.openPriceAvg) *
                    item.positionAmt
                )}

            {formatTPSL(item.TP) !== "-" && (
              <span
                className={styles.small}
                style={{ fontWeight: item.TP.length > 1 ? "bold" : "normal" }}
              >
                ({formatNumber(Number(formatTPSL(item.TP)))})
              </span>
            )}
          </div>
          <div className={styles.type1}>
            {formatTPSL(item.SL) === "-"
              ? "-"
              : formatNumber(
                  (Number(formatTPSL(item.SL)) - item.openPriceAvg) *
                    item.positionAmt
                )}

            {formatTPSL(item.SL) !== "-" && (
              <span
                className={styles.small}
                style={{ fontWeight: item.SL.length > 1 ? "bold" : "normal" }}
              >
                ({formatNumber(Number(formatTPSL(item.SL)))})
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FutureTableBody;
