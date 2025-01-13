import React from "react";
import { Accordion } from "react-bootstrap";
import FutureTableAccordionBody from "./Accordion/index.futureTableAccordionBody";
import styles from "./style/index.module.css";

import { CoinFuturePositionProps } from "types/coin";
import { formatNumber, formatTPSL } from "utils/init";

interface FutureTableBodyProps {
  data: CoinFuturePositionProps[];
}

const FutureTableBody: React.FC<FutureTableBodyProps> = ({ data }) => {
  return (
    <div className={styles.bodyRow}>
      {data.map((item, index) => (
        <Accordion flush key={item.symbol}>
          <Accordion.Header className={styles.BodyHeader}>
            <div>{index + 1}</div>
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
              <div className={styles.type4}>{formatNumber(item.markPrice)}</div>
              <div className={styles.type4}>
                {formatNumber(item.openPriceAvg)}
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
                  (
                  {formatNumber(
                    ((item.markPrice - item.openPriceAvg) * 100) /
                      item.openPriceAvg
                  )}
                  %)
                </span>
              </div>
              <div className={styles.type1}>
                {formatTPSL(item.TP_SL.TP) === "-"
                  ? "-"
                  : formatNumber(
                      (Number(formatTPSL(item.TP_SL.TP)) - item.openPriceAvg) *
                        item.positionAmt
                    )}

                {formatTPSL(item.TP_SL.TP) !== "-" && (
                  <span
                    className={styles.small}
                    style={{
                      fontWeight: item.TP_SL.TP.length > 1 ? "bold" : "normal",
                    }}
                  >
                    ({formatNumber(Number(formatTPSL(item.TP_SL.TP)))})
                  </span>
                )}
              </div>
              <div className={styles.type1}>
                {formatTPSL(item.TP_SL.SL) === "-"
                  ? "-"
                  : formatNumber(
                      (Number(formatTPSL(item.TP_SL.SL)) - item.openPriceAvg) *
                        item.positionAmt
                    )}

                {formatTPSL(item.TP_SL.SL) !== "-" && (
                  <span
                    className={styles.small}
                    style={{
                      fontWeight: item.TP_SL.SL.length > 1 ? "bold" : "normal",
                    }}
                  >
                    ({formatNumber(Number(formatTPSL(item.TP_SL.SL)))})
                  </span>
                )}
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.BodyBody}>
            <FutureTableAccordionBody
              coin={item.symbol}
              openPrice={item.openPriceAvg}
              SL={item.TP_SL.SL}
              TP={item.TP_SL.TP}
              amount={item.positionAmt}
            />
          </Accordion.Body>
        </Accordion>
      ))}
    </div>
  );
};

export default FutureTableBody;
