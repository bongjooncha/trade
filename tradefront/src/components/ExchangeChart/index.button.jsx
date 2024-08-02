import React, { useEffect, useState, useRef } from "react";

import { currency } from "./index.utils";
import styles from "./style/exchangehart.module.css";

const ExchangeButton = ({
  baseCurrency,
  setBaseCurrency,
  selectedCurrencies,
  setSelectedCurrencies,
}) => {
  const handleChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCurrencies([...selectedCurrencies, value]);
    } else {
      setSelectedCurrencies(
        selectedCurrencies.filter((currency) => currency !== value)
      );
    }
  };
  const handleSelectAll = () => {
    const allCurrencies = currency
      .filter((item) => item.unit !== baseCurrency)
      .map((item) => item.unit);
    setSelectedCurrencies(allCurrencies);
  };

  const handleDeselectAll = () => {
    setSelectedCurrencies([]);
  };

  return (
    <div>
      <div>
        <h5>BASE</h5>
        <div>
          <label>
            <input
              type="radio"
              value="USD"
              checked={baseCurrency === "USD"}
              onChange={handleChange}
            />
            USD(달라)
          </label>
          {"  "}
          <label>
            <input
              type="radio"
              value="KRW"
              checked={baseCurrency === "KRW"}
              onChange={handleChange}
            />
            KRW(한화)
          </label>
        </div>
      </div>
      <br />
      <div>
        <h5>COMPARE</h5>
        <button onClick={handleSelectAll}>모두 선택</button>
        <button onClick={handleDeselectAll}>선택 해제</button>
        <div className={styles.currencyGrid}>
          {currency
            .filter((item) => item.unit !== baseCurrency)
            .map((item) => (
              <div key={item.unit} className={styles.currencyItem}>
                <label>
                  <input
                    type="checkbox"
                    value={item.unit}
                    checked={selectedCurrencies.includes(item.unit)}
                    onChange={handleCheckboxChange}
                  />
                  {`${item.unit}: ${item.country}`}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeButton;
