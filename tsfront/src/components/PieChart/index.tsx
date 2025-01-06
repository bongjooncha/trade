import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { chartOptions } from "./index.options";

const PieChart: React.FC<{
  data: { name: string; y: number }[];
}> = ({ data }) => {
  const options = chartOptions(data);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
