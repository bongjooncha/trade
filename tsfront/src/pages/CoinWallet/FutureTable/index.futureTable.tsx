import React, { useState } from "react";
import styles from "../style/index.module.css";

import FutureTableHead from "./index.futureTableHead";
import FutureTotal from "./index.futureTotal";
import FutureTableBody from "./index.futureTableBody";
import PieChart from "components/PieChart";

import { CoinFuturePosition, CoinWalletBalance } from "types/coin";
import { formatTPSL } from "utils/init";
interface CoinWalletTableProps {
  data: CoinFuturePosition[];
  walletBalance: CoinWalletBalance;
  name: string;
}

const CoinWalletTable = ({
  data,
  walletBalance,
  name,
}: CoinWalletTableProps) => {
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState<"margin" | "ts">("margin");

  const pieChartData = data.map((item) => ({
    name: item.symbol,
    y:
      chartData === "margin"
        ? item.marginSize * item.leverage
        : (item.openPriceAvg - Number(formatTPSL(item.SL))) * item.positionAmt,
  }));

  const handleToggleChartType = () => {
    setChartData((prev) => (prev === "margin" ? "ts" : "margin"));
  };

  return (
    <div>
      <div className={styles.tableHead}>
        <h4>
          {name} <span className={styles.small}>future</span>
        </h4>
        <button
          className={styles.viewChartBtn}
          onClick={() => {
            setShowChart(!showChart);
          }}
        >
          차트 on/off
        </button>
      </div>
      {showChart && (
        <div className={styles.pieChartContainer}>
          <div className={styles.pieChart}>
            <PieChart data={pieChartData} />
          </div>
          <button
            className={styles.toggleChartTypeBtn}
            onClick={handleToggleChartType}
          >
            {chartData === "margin" ? "손절액 비율" : "포지션 비율 보기"}
          </button>
        </div>
      )}
      <br />
      <div className={styles.WalletTable}>
        <FutureTableHead />
        <FutureTableBody data={data} />
      </div>
      <FutureTotal data={data} walletBalance={walletBalance} />
    </div>
  );
};

export default CoinWalletTable;
