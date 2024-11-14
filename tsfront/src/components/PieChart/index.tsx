import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart: React.FC = () => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Sample Pie Chart",
    },
    series: [
      {
        type: "pie",
        data: [
          { name: "Apples", y: 30 },
          { name: "Bananas", y: 20 },
          { name: "Cherries", y: 50 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default PieChart;
