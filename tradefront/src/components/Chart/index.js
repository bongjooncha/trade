import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import stockTools from "highcharts/modules/stock-tools";

import { fetchCandle } from "api/Upbit_api"; // 경로를 실제 파일 경로로 대체하세요

// Stock Tools 모듈 초기화
stockTools(Highcharts);

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
      chart: {
        height: 800, // 차트 높이를 800px로 설정
        width: 1600,
      },
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
                // Left side limit
                chart.plotLeft,
                Math.min(
                  point.plotX + chart.plotLeft - width / 2,
                  // Right side limit
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
          type: "candlestick",
          id: "ohlc",
          name: `${market} Price`,
          data: ohlc,
        },
        {
          type: "column",
          id: "volume",
          name: `${market} Volume`,
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
      accessibility: {
        enabled: true, // 접근성 모듈 경고를 비활성화
      },
      stockTools: {
        gui: {
          enabled: true, // Stock Tools GUI를 활성화
        },
      },
      navigation: {
        bindingsClassName: "highcharts-bindings-wrapper", // 필수적인 기본 설정
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
      <div id="container" />
    </div>
  );
};

export default App;
