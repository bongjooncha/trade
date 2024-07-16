import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCandle } from "api/Upbit/Upbit_api";
import style from "./style/chart.module.css";
import { intervals } from "./index.utils";
import { createChart, updateChart } from "./index.chart";

const Trychart = ({ market }) => {
  const [intervalUnit, setIntervalUnit] = useState("minutes/5");
  const chartRef = useRef(null);
  const [price, setPrice] = useState(null);
  const loadMoreRef = useRef(null);
  {
    const { data: candleData, refetch } = useQuery({
      queryKey: ["candles", market, intervalUnit],
      queryFn: () => fetchCandle(market, intervalUnit),
    });

    useEffect(() => {
      refetch();
    }, [intervalUnit]);

    const ohlc = [];
    const volume = [];

    useEffect(() => {
      if (!candleData) return;

      candleData.forEach((item) => {
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
      if (!chartRef.current) {
        chartRef.current = createChart(style.container, ohlc, volume, market);
      } else {
        updateChart(chartRef.current, ohlc, volume);
      }
    }, [candleData]);
  }
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
        <div>
          <select
            value={intervalUnit}
            onChange={(e) => setIntervalUnit(e.target.value)}
          >
            {intervals.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id={style.container} ref={loadMoreRef}></div>
    </div>
  );
};

export default Trychart;
