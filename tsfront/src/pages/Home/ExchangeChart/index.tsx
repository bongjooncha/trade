import styles from "./style/index.module.css";
import { useState } from "react";

import BaseButton from "components/IndexChart/index.baseButton";
import { useExchange } from "hooks/indexHooks/exchange";

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
    <div>
      <div className={styles.currency}>
        <div>
          <BaseButton
            baseCurrency={baseCurrency}
            handleChange={handleBaseCurrency}
          />
        </div>
        <div className={styles.currencyButton}>
          {/* <ExchangeButton
            baseCurrency={baseCurrency}
            selectedCurrencies={selectedCurrencies}
            setSelectedCurrencies={setSelectedCurrencies}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ExchangeChart;
