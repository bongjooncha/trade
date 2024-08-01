import Highcharts from "highcharts/highstock";
import Indicators from "highcharts/indicators/indicators-all.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import Accessibility from "highcharts/modules/accessibility";
import StockTools from "highcharts/modules/stock-tools.js";

Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
Accessibility(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

export const createChart = (container, ohlc, volume, market) => {
  return Highcharts.stockChart(container, {
    // 기존 차트 설정 유지
    // 이벤트 감지
    xAxis: {
      events: {
        afterSetExtremes: function (event) {
          if (event.min === ohlc[ohlc.length - 1][0]) {
            // data =
          }
        },
      },
    },
    // 차트 종류
    yAxis: [
      {
        labels: {
          align: "left",
        },
        height: "80%",
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "left",
        },
        top: "80%",
        height: "20%",
        offset: 0,
      },
    ],
    // 위 네모
    tooltip: {
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        const chart = this.chart;
        let position;
        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.margin
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }
        return position;
      },
      formatter: function () {
        var tooltipContent =
          "<b>" +
          this.series.name +
          "</b><br/>" +
          "Date: " +
          Highcharts.dateFormat("%Y-%m-%d", this.x) +
          "<br/>" +
          "Open: " +
          this.point.open +
          "<br/>" +
          "High: " +
          this.point.high +
          "<br/>" +
          "Low: " +
          this.point.low +
          "<br/>" +
          "Close: " +
          this.point.close +
          "<br/>";

        if (this.series.options.id === "volume") {
          tooltipContent += "Volume: " + this.point.y + "<br/>";
        }

        return tooltipContent;
      },
    },
    series: [
      {
        type: "candlestick",
        id: "price",
        name: `${market} Price`,
        data: ohlc,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        type: "column",
        id: "volume",
        name: `${market} Volume`,
        data: volume,
        yAxis: 1,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        showInNavigator: true,
      },
    ],
    // plot 색설정
    plotOptions: {
      series: {
        animation: {
          duration: 0,
        },
      },
      candlestick: {
        color: "darkblue",
        lineColor: "blue",
        upColor: "red",
        upLineColor: "red",
      },
      ohlc: { color: "blue", upColor: "red" },
    },
    chart: {
      height: 800, // 차트 높이를 800px로 설정
      width: 1300,
    },
    accessibility: {
      enabled: true, // 접근성 모듈 경고를 비활성화
    },
    // Stock Tools GUI를 활성화
    stockTools: {
      gui: {
        enabled: true,
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            // maxWidth: 1500,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
    rangeSelector: {
      verticalAlign: "top",
      x: 0,
      y: 0,
    },
  });
};

export const updateChart = (chart, ohlc, volume) => {
  if (chart) {
    chart.series[0].setData(ohlc, true, false, false);
    chart.series[1].setData(volume, true, false, false);
  }
};
