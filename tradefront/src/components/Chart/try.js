import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import stockTools from "highcharts/modules/stock-tools";

// Stock Tools 모듈 초기화
stockTools(Highcharts);

const App = () => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
      );
      const data = await response.json();

      const ohlc = [];
      const volume = [];
      const dataLength = data.length;

      for (let i = 0; i < dataLength; i += 1) {
        ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        volume.push([
          data[i][0], // the date
          data[i][5], // the volume
        ]);
      }

      setOptions({
        stockTools: {
          gui: {
            enabled: true,
          },
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
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
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
    };

    fetchData();
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default App;
