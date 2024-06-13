import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
// 1. load high chart all indicators
import Indicators from "highcharts/indicators/indicators-all.js";
// 2. other modules in tool box
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
// 3.Stock Tools module
import StockTools from "highcharts/modules/stock-tools.js";
// 4. 이안에 css파일 load함
import "./style/style.css";

// Stock Tools 모듈 초기화
Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

const Trychart = () => {
  useEffect(() => {
    (async () => {
      // 데이터셋 로드
      const data = await fetch(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
      ).then((response) => response.json());

      // 데이터셋을 ohlc와 volume으로 분할
      const ohlc = [],
        volume = [],
        dataLength = data.length;

      for (let i = 0; i < dataLength; i += 1) {
        ohlc.push([
          data[i][0], // 날짜
          data[i][1], // 시가
          data[i][2], // 고가
          data[i][3], // 저가
          data[i][4], // 종가
        ]);

        volume.push([
          data[i][0], // 날짜
          data[i][5], // 거래량
        ]);
      }

      Highcharts.stockChart("container", {
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
        tooltip: {
          shape: "square",
          headerShape: "callout",
          borderWidth: 0,
          shadow: false,
          positioner: function (width, height, point) {
            const chart = this.chart;
            let position;

            if (point.isHeader) {
              position = {
                x: Math.max(
                  // 왼쪽 한계
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    // 오른쪽 한계
                    chart.chartWidth - width - chart.marginRight
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
        },
        series: [
          {
            type: "ohlc",
            id: "aapl-ohlc",
            name: "AAPL Stock Price",
            data: ohlc,
          },
          {
            type: "column",
            id: "aapl-volume",
            name: "AAPL Volume",
            data: volume,
            yAxis: 1,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 800,
              },
              chartOptions: {
                rangeSelector: {
                  inputEnabled: false,
                },
              },
            },
          ],
        },
      });
    })();
  }, []);

  return (
    <div
      id="container"
      className="chart"
      style={{ height: "800px", minWidth: "1000px" }}
    />
  );
};

export default Trychart;
