import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./style/index.module.css";
import { ChartProps } from "types/index/chart";

const Chart: React.FC<ChartProps> = ({ options }) => {
  return (
    <div className={styles.currencyChart}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
