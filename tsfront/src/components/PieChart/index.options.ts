export const chartOptions = (data: any) => {
  return {
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
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y:.2f}$</b>",
    },
    series: [
      {
        type: "pie",
        data: data,
      },
    ],
  };
};
