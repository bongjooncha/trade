export const options = (baseCurrency: string, data: any) => {
  return {
    chart: {
      type: "spline",
      zoomType: "x", // X축 기준으로 확대/축소 활성화
      height: 50 + "%",
    },
    title: {
      text: `${baseCurrency} 기준 국가 별 환율 등락비`,
      align: "left",
    },
    subtitle: {
      text: "18년 1월1일 부터의 평균을 기준으로 함",
      align: "left",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%Y-%m-%d",
      },
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "환율",
      },
      plotLines: [
        {
          value: 0,
          color: "brown",
          width: 2,
          label: {
            text: `${baseCurrency}`,
            align: "right",
            style: {
              color: "brown",
              fontWeight: "bold",
            },
          },
        },
      ],
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      pointFormat: "<br/>{series.name}: <b>{point.y:.2f}%</b>",
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    series: data,
  };
};
