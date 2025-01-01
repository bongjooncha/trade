import { useState } from "react";
import styles from "./style/index.module.css";

import BaseButton from "components/IndexChart/index.baseButton";
import Buttons from "components/IndexChart/index.button";
import { useExchange } from "hooks/indexHooks/exchange";
import { currency } from "./index.utils";

const ExchangeChart = () => {
  const {
    data,
    isLoading,
    error,
    baseCurrency,
    handleBaseCurrency,
    selectedCurrencies,
    handleSelectedCurrencies,
  } = useExchange();

  return (
    <div className={styles.currency}>
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
