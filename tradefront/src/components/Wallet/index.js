// Wallet.js
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Wallet = ({ data }) => {
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
              {data.map((item, index) => (
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
