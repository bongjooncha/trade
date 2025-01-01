import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./style/Ichart.module.css";
import { ChartProps } from "types/index/chart";

const Chart: React.FC<ChartProps> = ({ baseCurrency, data, options }) => {
  return (
    <div className={styles.currencyChart}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options(baseCurrency, data)}
      />
    </div>
  );
};

export default Chart;
