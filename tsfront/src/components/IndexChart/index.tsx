import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./style/Ichart.module.css";

const Chart = ({
  baseCurrency,
  data,
  options,
}: {
  baseCurrency: string;
  data: any;
  options: any;
}) => {
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
