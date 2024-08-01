import React, { useEffect, useState } from "react";
import { fetchAverage, fetchPrice } from "api/Exchange/Exchange_api";
import styles from "./style/exchangehart.module.css";

import ExchangeButton from "./index.button";
import Chart from "./index.chart";

const ExchangeChart = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "JPY",
    "KRW",
    "GBP",
    "CNY",
    "EUR",
  ]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const seriesData = await Promise.all(
        selectedCurrencies.map(async (currency) => {
          if (currency === baseCurrency) return null; // 같은 통화일 경우 스킵
          const currencyPair = `${currency}${baseCurrency}`;
          try {
            // 데이터를 가져오는 API 요청을 가정
            const priceResponse = await fetchPrice(currencyPair);
            const averageResponse = await fetchAverage(currencyPair);
            const average = averageResponse[0]["AVG(Close)"];
            const data = priceResponse.map((item) => [
              Date.parse(item.Date), // 날짜를 파싱하여 타임스탬프로 변환
              ((item.Close - average) * 100) / average, // 종가
            ]);
            return { name: currencyPair, data };
          } catch (error) {
            console.error(`Error fetching data for ${currencyPair}:`, error);
            return null;
          }
        })
      );

      setChartData(seriesData.filter((series) => series !== null)); // null 값 제거
    };

    fetchData();
  }, [baseCurrency, selectedCurrencies]);

  return (
    <div>
      <div className={styles.currency}>
        <div>
          <Chart baseCurrency={baseCurrency} data={chartData} />
        </div>
        <div className={styles.currencyButton}>
          <ExchangeButton
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
            selectedCurrencies={selectedCurrencies}
            setSelectedCurrencies={setSelectedCurrencies}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeChart;
