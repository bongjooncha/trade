import styles from "./style/index.module.css";
import Chart from "components/IndexChart/index.chart";
import IndexButtons from "./index.buttons";
import { options } from "./index.chartOptions";
import { useIndex } from "hooks/indexHooks/index";
import { useEffect } from "react";

const IndexChart = () => {
  const { indexData } = useIndex();
  useEffect(() => {
    console.log("indexData가 변경되었습니다:", indexData);
  }, [indexData]);
  const baseCurrency = "";
  console.log(indexData);
  return (
    <div className={styles.main}>
      <div className={styles.chart}>
        <Chart options={options(baseCurrency, indexData)} />
      </div>
      <IndexButtons />
    </div>
  );
};

export default IndexChart;
