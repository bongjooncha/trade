import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_accessibility from "highcharts/modules/accessibility";

HC_accessibility(Highcharts);
/* data(ex) = [{
    "name": "BTC",
    "balance": 0.00339458,
    "avg_buy_price": 87850000,
    "unit_currency": "KRW",
    "current_price": 88461000,
    "total_price": 300287.94138
}]*/
export const HighPieChart = ({ data }) => {
  const chartData = data.map((item) => {
    return {
      name: item.name,
      y: item.total_price,
      price: item.total_price,
      unit: item.unit_currency,
    };
  });

  const pieChartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "보유 자산 (%)",
    },
    tooltip: {
      pointFormat: "<b>{point.price:.1f} {point.unit}</b>",
    },
    plotOptions: {
      pie: {
        innerSize: "40%", // 도넛 차트 형태
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f}%",
          style: {
            color: "black", // 데이터 레이블의 색상 설정
            textOutline: "none", // 텍스트 윤곽선 제거
          },
          distance: -50, // 데이터 레이블 위치 조정 (값에 따라 조절 가능)
        },
      },
      showInLegend: true,
    },
    series: [
      {
        name: "Assets",
        colorByPoint: true,
        data: chartData,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
    </>
  );
};
