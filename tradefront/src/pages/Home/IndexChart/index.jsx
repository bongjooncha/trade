import React, { useEffect, useState, useMemo } from "react";
import { fetchIndexAverage, fetchIndexPrice } from "api/Flow/Index_api";
import styles from "./style/exchangehart.module.css";
import { TotalIndex } from "./index.utils";

import IndexButton from "./index.button";
import Chart from "./index.chart";

const IndexChart = () => {
  const [selectedIndex, setSelectedIndex] = useState(["^GSPC"]);
  const [chartData, setChartData] = useState([]);
  const [fetchedIndexes, setFetchedIndexes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newIndexes = selectedIndex.filter(
        (index) => !fetchedIndexes.includes(index)
      );

      const sericesData = await Promise.all(
        newIndexes.map(async (index) => {
          try {
            const { name } = TotalIndex.find((item) => item.ticker === index);
            const priceResponse = await fetchIndexPrice(index);
            const averageResponse = await fetchIndexAverage(index);
            const average = averageResponse[0]["AVG(Close)"];
            const data = priceResponse.map((item) => [
              Date.parse(item.Date), // 날짜를 파싱하여 타임스탬프로 변환
              ((item.Close - average) * 100) / average, // 종가
            ]);
            return { name, data };
          } catch (error) {
            console.error(`Error fetching data for ${index}:`, error);
            return null;
          }
        })
      );
      const newData = sericesData.reduce((acc, series) => {
        if (series) {
          acc[series.name] = series.data;
        }
        return acc;
      }, {});
      setChartData((prevData) => ({ ...prevData, ...newData }));
      setFetchedIndexes((prevIndexes) => [...prevIndexes, ...newIndexes]);
    };
    fetchData();
  }, [selectedIndex]);

  const filteredChartData = useMemo(() => {
    const selectedNames = selectedIndex
      .map((ticker) => {
        const item = TotalIndex.find((item) => item.ticker === ticker);
        return item ? item.name : null;
      })
      .filter((name) => name !== null);

    return Object.keys(chartData)
      .filter((key) => selectedNames.includes(key))
      .map((key) => ({
        name: key,
        data: chartData[key],
      }));
  }, [chartData, selectedIndex]);

  return (
    <div>
      <div className={styles.index}>
        <div>
          <Chart data={filteredChartData} />
        </div>
        <div className={styles.indexButton}>
          <IndexButton
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default IndexChart;
