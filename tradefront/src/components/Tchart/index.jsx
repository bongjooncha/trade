// components/Chart.jsx
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ data }) => {
  const chartContainerRef = useRef(null);
  console.log(data);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default Chart;
