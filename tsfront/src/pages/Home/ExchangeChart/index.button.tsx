import React, { useState, useEffect } from "react";

import IndexButton from "components/IndexButton";
import BaseButton from "./index.baseButton";
import { currency } from "./index.utils";
import styles from "./style/index.module.css";

const ExchangeButton = ({
  baseCurrency,
  setBaseCurrency,
  selectedCurrencies,
  setSelectedCurrencies,
}: {
  baseCurrency: string;
  setBaseCurrency: (value: string) => void;
  selectedCurrencies: string[];
  setSelectedCurrencies: (value: string[]) => void;
}) => {
  const [filteredCurrency, setFilteredCurrency] = useState<
    {
      ticker: string;
      name: string;
    }[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseCurrency(e.target.value);
  };

  useEffect(() => {
    const filtered = currency.filter((item) => item.ticker !== baseCurrency);
    setFilteredCurrency(filtered);
  }, [baseCurrency]);

  const handleSelectAll = () => {
    const allCurrencies = currency
      .filter((item) => item.ticker !== baseCurrency)
      .map((item) => item.ticker);
    setSelectedCurrencies(allCurrencies);
  };

  const handleDeselectAll = () => {
    setSelectedCurrencies([]);
  };

  return (
    <div>
      <BaseButton baseCurrency={baseCurrency} handleChange={handleChange} />
      <br />
      <div>
        <IndexButton
          title="COMPARE"
          elements={filteredCurrency}
          selected={selectedCurrencies}
          setSelected={setSelectedCurrencies}
        />
        <br />
        <div className={styles.dataControll}>
          <button onClick={handleSelectAll}>모두 선택</button>
          <button onClick={handleDeselectAll}>선택 해제</button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeButton;
