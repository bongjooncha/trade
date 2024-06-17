import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { fetchAccount } from "api/Upbit_api";

const Wallet = () => {
  const [data, setData] = useState(null);
  const [assetData, setAssetData] = useState([]);

  const fetchData = async () => {
    try {
      const rawData = await fetchAccount();

      // 총 자산(KRW 기준)을 계산
      let totalAsset = rawData.reduce((acc, item) => {
        return (
          acc +
          (parseFloat(item.balance) + parseFloat(item.locked)) *
            parseFloat(item.avg_buy_price)
        );
      }, 0);

      // KRW 자산 추가
      const krwData = rawData.find((item) => item.currency === "KRW");
      if (krwData) {
        totalAsset += parseFloat(krwData.balance);
      }

      // 자산 비율 계산
      const transformedData = rawData
        .map((item) => ({
          name: item.currency,
          y:
            (parseFloat(item.balance) + parseFloat(item.locked)) *
            parseFloat(item.avg_buy_price),
          balance: item.balance,
          locked: item.locked,
          avg_buy_price: item.avg_buy_price,
          unit_currency: item.unit_currency,
        }))
        .filter((item) => item.y > 0);

      // KRW 자산 추가
      if (krwData) {
        transformedData.push({
          name: "KRW",
          y: parseFloat(krwData.balance),
          balance: krwData.balance,
          locked: 0,
          avg_buy_price: 1,
          unit_currency: "KRW",
        });
      }

      // 자산 비율에 따른 퍼센티지 계산
      const assetPercentages = transformedData.map((item) => ({
        ...item,
        percentage: ((item.y / totalAsset) * 100).toFixed(2),
      }));

      setData(assetPercentages);
      setAssetData(assetPercentages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "보유 자산 포트폴리오",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Assets",
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>보유 자산 포트폴리오</h1>
        {data ? (
          <>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div style={{ marginTop: "20px" }}>
              <h2>보유 자산 목록</h2>
              {assetData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <p>
                    <strong>자산:</strong> {item.name}
                  </p>
                  <p>
                    <strong>보유량:</strong> {item.balance} {item.name}
                  </p>
                  <p>
                    <strong>평균 매수가:</strong> {item.avg_buy_price}{" "}
                    {item.unit_currency}
                  </p>
                  <p>
                    <strong>잠금 수량:</strong> {item.locked}
                  </p>
                  <p>
                    <strong>총 가치:</strong> {item.y.toFixed(2)}{" "}
                    {item.unit_currency}
                  </p>
                  <p>
                    <strong>비율:</strong> {item.percentage}%
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </header>
    </div>
  );
};

export default Wallet;
