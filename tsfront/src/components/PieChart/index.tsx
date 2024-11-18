import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart: React.FC<{
  data: { name: string; y: number }[];
}> = ({ data }) => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f} %",
          style: {
            fontSize: "14px",
            color: "white",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default PieChart;
