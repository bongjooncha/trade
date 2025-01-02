import styles from "./style/index.module.css";
import Chart from "components/IndexChart/index.chart";
import Buttons from "components/IndexChart/index.button";
import { options } from "./index.chartOptions";
import { useIndex } from "hooks/indexHooks/index";
import {
  US,
  WestAsia,
  EU,
  SouthEastAsia,
  Item,
  TotalIndex,
} from "./index.utils";

const IndexChart = () => {
  const { indexData, selectedIndex, handleSelectedIndex } = useIndex();
  const baseCurrency = "";
  return (
    <div className={styles.main}>
      <div className={styles.chart}>
        <Chart options={options(baseCurrency, indexData)} />
      </div>
      <div className={styles.buttonContainer}>
        <h5>US</h5>
        <div className={styles.button}>
          <Buttons
            elements={US}
            selected={selectedIndex}
            handleCheckboxChange={handleSelectedIndex}
          />
        </div>
        <br />
        <h5>WEST ASIA</h5>
        <div className={styles.button}>
          <Buttons
            elements={WestAsia}
            selected={selectedIndex}
            handleCheckboxChange={handleSelectedIndex}
          />
        </div>
        <br />
        <h5>EU</h5>
        <div className={styles.button}>
          <Buttons
            elements={EU}
            selected={selectedIndex}
            handleCheckboxChange={handleSelectedIndex}
          />
        </div>
        <br />
        <h5>SOUTH EAST ASIA</h5>
        <div className={styles.button}>
          <Buttons
            elements={SouthEastAsia}
            selected={selectedIndex}
            handleCheckboxChange={handleSelectedIndex}
          />
        </div>
        <br />
        <h5>ITEMS</h5>
        <div className={styles.button}>
          <Buttons
            elements={Item}
            selected={selectedIndex}
            handleCheckboxChange={handleSelectedIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default IndexChart;
