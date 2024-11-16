import React from "react";
import styles from "../style/index.module.css";

import { CoinFuturePosition } from "types/coin";
import { formatNumber, formatTPSL } from "utils/init";

interface FutureTableBodyProps {
  data: CoinFuturePosition[];
}

const FutureTableBody = ({ data }: FutureTableBodyProps) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.symbol}>
          <td>{item.symbol}</td>
          <td
            style={{
              color: item.holdSide === "long" ? "pink" : "skyblue",
            }}
          >
            {item.holdSide}
          </td>
          <td>
            {formatNumber(item.marginSize * item.leverage) + "   "}
            USDT {"   "}
            <span className={styles.small}>(x {item.leverage})</span>
          </td>
          <td>
            {formatNumber(item.markPrice)} /{formatNumber(item.openPriceAvg)}
          </td>
          <td
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
          </td>
          <td>
            {formatTPSL(item.TP) === "-"
              ? "-"
              : formatNumber(
                  (Number(formatTPSL(item.TP)) - item.openPriceAvg) *
                    item.positionAmt
                )}

            {formatTPSL(item.TP) !== "-" && (
              <span className={styles.small}>
                ({formatNumber(Number(formatTPSL(item.TP)))})
              </span>
            )}
          </td>
          <td>
            {formatTPSL(item.SL) === "-"
              ? "-"
              : formatNumber(
                  (Number(formatTPSL(item.SL)) - item.openPriceAvg) *
                    item.positionAmt
                )}

            {formatTPSL(item.SL) !== "-" && (
              <span className={styles.small}>
                ({formatNumber(Number(formatTPSL(item.SL)))})
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default FutureTableBody;
