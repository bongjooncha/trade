import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
// API 정보 받아오는 함수
import { fetchCandle } from "api/Upbit/Upbit_api";

// 1. load high chart all indicators
import Indicators from "highcharts/indicators/indicators-all.js";
// 2. other modules in tool box
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import Accessibility from "highcharts/modules/accessibility";
// 3.Stock Tools module
import StockTools from "highcharts/modules/stock-tools.js";
// 4. 이안에 css파일 load함
import style from "./style/chart.module.css";

// Stock Tools 모듈 초기화
Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
Accessibility(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

const Trychart = ({ market }) => {
  const [intervalUnit, setIntervalUnit] = useState("minutes/5");
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(null);

  const intervals = [
    { value: "minutes/1", label: "1분" },
    { value: "minutes/3", label: "3분" },
    { value: "minutes/5", label: "5분" },
    { value: "minutes/10", label: "10분" },
    { value: "minutes/15", label: "15분" },
    { value: "minutes/30", label: "30분" },
    { value: "minutes/60", label: "1시간" },
    { value: "minutes/240", label: "4시간" },
    { value: "days/", label: "1일" },
    { value: "weeks/", label: "1주" },
    { value: "months/", label: "한 달" },
  ];

  const fetchData = async () => {
    try {
      const interval = `${intervalUnit}`;
      const candleData = await fetchCandle(market, interval);
      setData(candleData);
    } catch (error) {
      console.error("Error fetching candle data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [market, intervalUnit]);

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

    ohlc.sort((a, b) => a[0] - b[0]);
    volume.sort((a, b) => a[0] - b[0]);

    if (ohlc.length > 0) {
      setPrice(ohlc[0][4]); // ohlc 배열의 첫 번째 항목에서 trade_price를 가져옴
    }

    Highcharts.stockChart(style.container, {
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
      // 초기설정
      series: [
        {
          type: "candlestick",
          id: "price",
          name: `${market} Price`,
          data: ohlc,
          tooltip: {
            valueDecimals: 2, // 소수점 이하 두 자리까지 표시
          },
        },
        {
          type: "column",
          id: "volume",
          name: `${market} Volume`,
          data: volume,
          yAxis: 1,
          tooltip: {
            valueDecimals: 2, // 소수점 이하 두 자리까지 표시
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
  }, [data]);

  return (
    <div className={style.chartMain}>
      <div className={style.head}>
        <div>
          <h2>{market}</h2>
          <h3>
            {price !== null
              ? `₩${Number(price).toLocaleString()}`
              : "Loading..."}
          </h3>
        </div>
        <label>
          Interval Unit:
          <select
            value={intervalUnit}
            onChange={(e) => setIntervalUnit(e.target.value)}
          >
            {intervals.map((interval, index) => (
              <option key={index} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div id={style.container} className="chart" />
    </div>
  );
};

export default Trychart;
