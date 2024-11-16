import React from "react";
import styles from "../style/index.module.css";

import FutureTableTotal from "./index.futureTableTotal";

import { CoinFuturePosition } from "types/coin";
import { formatNumber } from "utils/init";

interface CoinWalletTableProps {
  data: CoinFuturePosition[];
  name: string;
}

const CoinWalletTable = ({ data, name }: CoinWalletTableProps) => {
  return (
    <div>
      <h4>
        {name} <span className={styles.small}>future</span>
      </h4>
      <table className={styles.WalletTable}>
        <thead>
          <tr>
            <th className={styles.type1}>코인명</th>
            <th className={styles.type2}>롱/숏</th>
            <th className={styles.type3}>포지션</th>
            <th className={styles.type3}>현재가 / 평단가</th>
            <th className={styles.type3}>손익</th>
            <th className={styles.type1}>익절액</th>
            <th className={styles.type1}>손절액</th>
          </tr>
        </thead>
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
                {formatNumber(item.markPrice)} /
                {formatNumber(item.openPriceAvg)}
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
              <td>{item.achievedProfits.toFixed(2)}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <FutureTableTotal data={data} />
    </div>
  );
};

export default CoinWalletTable;
