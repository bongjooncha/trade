import { useState } from "react";
import styles from "./style/index.module.css";

import Chart from "components/IndexChart/index.chart";
import { options } from "./index.chartOptions";
import BaseButton from "components/IndexChart/index.baseButton";
import Buttons from "components/IndexChart/index.button";
import { useExchange } from "hooks/indexHooks/exchange";
import { currency } from "./index.utils";

const ExchangeChart = () => {
  const {
    baseCurrency,
    handleBaseCurrency,
    selectedCurrencies,
    handleSelectedCurrencies,
  } = useExchange();

  return (
    <div className={styles.main}>
      <div className={styles.chart}>
        <Chart options={options(baseCurrency, selectedCurrencies)} />
      </div>
      <h5>BASE CURRENCY</h5>
      <div>
        <BaseButton
          baseCurrency={baseCurrency}
          handleChange={handleBaseCurrency}
        />
      </div>
      <br />

      <h5>COMPARE CURRENCY</h5>
      <div className={styles.currencyButton}>
        <Buttons
          elements={currency}
          selected={selectedCurrencies}
          handleCheckboxChange={handleSelectedCurrencies}
        />
      </div>
      <br />
    </div>
  );
};

export default ExchangeChart;
