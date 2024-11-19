import React from "react";
import styles from "../style/index.module.css";

import { CoinFuturePosition, CoinWalletBalance } from "types/coin";
import { formatNumber, formatTPSL } from "utils/init";

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
  const totalTP = data.reduce(
    (acc, item) => acc + Number(formatTPSL(item.TP)),
    0
  );
  const totalSL = data.reduce(
    (acc, item) => acc + Number(formatTPSL(item.SL)),
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
      <h5>
        <div>최대 수익 : {formatNumber(totalTP)} USDT</div>
        <div>최대 손실 : {formatNumber(totalSL)} USDT</div>
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
