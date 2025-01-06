import React, { useState } from "react";
import styles from "../style/index.module.css";

import PieChart from "components/PieChart";
import { CoinFuturePositionProps } from "types/coin";
import { formatTPSL } from "utils/init";

interface HeaderProps {
  name: string;
  data: CoinFuturePositionProps[];
}

const Header: React.FC<HeaderProps> = ({ name, data }) => {
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState<"margin" | "ts">("margin");

  const pieChartData = data.map((item) => ({
    name: item.symbol,
    y:
      chartData === "margin"
        ? item.marginSize * item.leverage
        : (item.openPriceAvg - Number(formatTPSL(item.TP_SL.SL))) *
          item.positionAmt,
  }));

  const handleToggleChartType = () => {
    setChartData((prev) => (prev === "margin" ? "ts" : "margin"));
  };

  return (
    <>
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
    </>
  );
};

export default Header;
