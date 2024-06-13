import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
// API 정보 받아오는 함수
import { fetchCandle } from "api/Upbit_api";

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

const App = () => {
  const [market, setMarket] = useState("KRW-BTC");
  const [intervalUnit, setIntervalUnit] = useState("minutes");
  const [intervalValue, setIntervalValue] = useState(5);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const interval = `${intervalUnit}/${intervalValue}`;
      const candleData = await fetchCandle(market, interval);
      setData(candleData);
    } catch (error) {
      console.error("Error fetching candle data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [market, intervalUnit, intervalValue]);

  useEffect(() => {
    if (data.length === 0) return;

    const ohlc = [];
    const volume = [];
    console.log(ohlc);

    data.forEach((item) => {
      ohlc.push([
        new Date(item.candle_date_time_kst).getTime(), // the date
        item.opening_price, // open
        item.high_price, // high
        item.low_price, // low
        item.trade_price, // close
      ]);

      volume.push([
        new Date(item.candle_date_time_kst).getTime(), // the date
        item.candle_acc_trade_volume, // the volume
      ]);
    });

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
      // 초기설정
      series: [
        {
          type: "candlestick",
          id: "price",
          name: `${market} Price`,
          data: ohlc,
          pointWidth: 10,
          tooltip: {
            valueDecimals: 2, // 소수점 이하 두 자리까지 표시
          },
          turboThreshold: 2000, // 터보 임계값 증가
        },
        {
          type: "column",
          id: "volume",
          name: `${market} Volume`,
          data: volume,
          yAxis: 1,
          pointWidth: 10,
          tooltip: {
            valueDecimals: 2, // 소수점 이하 두 자리까지 표시
          },
          turboThreshold: 2000, // 터보 임계값 증가
        },
      ],
      // plot 색설정
      plotOptions: {
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
        width: 1500,
      },
      accessibility: {
        enabled: false, // 접근성 모듈 경고를 비활성화
      },
      // Stock Tools GUI를 활성화
      stockTools: {
        gui: {
          enabled: true,
        },
      },
    });
  }, [data]);

  return (
    <div>
      <div>
        <label>
          Market:
          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          />
        </label>
        <label>
          Interval Unit:
          <select
            value={intervalUnit}
            onChange={(e) => setIntervalUnit(e.target.value)}
          >
            <option value="minutes">Minute</option>
            <option value="days">Day</option>
            <option value="weeks">Week</option>
            <option value="months">Month</option>
          </select>
        </label>
        <label>
          Interval Value:
          <input
            type="number"
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
          />
        </label>
        <button onClick={fetchData}>Update</button>
      </div>
      <div
        id="container"
        className="chart"
        style={{ height: "800px", minWidth: "1000px" }}
      />
    </div>
  );
};

export default App;
