import React from "react";
import styles from "../style/index.module.css";

import { formatNumber } from "utils/init";
import { CoinFuturePosition, CoinWalletBalance } from "types/coin";

interface FutureTableTotalProps {
  data: CoinFuturePosition[];
  walletBalance: CoinWalletBalance;
}

const FutureTotal = ({ data, walletBalance }: FutureTableTotalProps) => {
  const totalProfit = data.reduce((acc, item) => acc + item.unrealizedPL, 0);
  const totalMargin = data.reduce(
    (acc, item) => acc + item.marginSize * item.leverage,
    0
  );

  return (
    <div className={styles.total}>
      <h5>
        <div>총 포지션 가치 : {formatNumber(totalMargin)} USDT</div>
        <div>
          총익: {formatNumber(totalProfit)} {"   "}USDT
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
        </div>
      </h5>
      <h6>
        <div>계좌 내 현금 : {formatNumber(walletBalance.free)} USDT</div>
        <div>사용 자산 : {formatNumber(walletBalance.used)} USDT</div>
        <div>총액 : {formatNumber(walletBalance.total)} USDT</div>
      </h6>
    </div>
  );
};

export default FutureTotal;
