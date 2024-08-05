import React from "react";

import { Item, US, WestAsia, EU, SouthEastAsia } from "./index.utils";
import styles from "./style/exchangehart.module.css";

const ExchangeButton = ({ selectedIndex, setSelectedIndex }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedIndex([...selectedIndex, value]);
    } else {
      setSelectedIndex(selectedIndex.filter((index) => index !== value));
    }
  };

  const handleDeselectAll = () => {
    setSelectedIndex([]);
  };

  return (
    <div>
      <div>
        <h5>US Index</h5>
        <div className={styles.indexGrid}>
          {US.map((item) => (
            <div key={item.ticker} className={styles.indexItem}>
              <label>
                <input
                  type="checkbox"
                  value={item.ticker}
                  checked={selectedIndex.includes(item.ticker)}
                  onChange={handleCheckboxChange}
                />
                {`${item.name}`}
              </label>
            </div>
          ))}
        </div>
        <br />
        <br />

        <h5>West Asia Index</h5>
        <div className={styles.indexGrid}>
          {WestAsia.map((item) => (
            <div key={item.ticker} className={styles.indexItem}>
              <label>
                <input
                  type="checkbox"
                  value={item.ticker}
                  checked={selectedIndex.includes(item.ticker)}
                  onChange={handleCheckboxChange}
                />
                {`${item.name}`}
              </label>
            </div>
          ))}
        </div>
        <br />
        <br />

        <h5>EU Index</h5>
        <div className={styles.indexGrid}>
          {EU.map((item) => (
            <div key={item.ticker} className={styles.indexItem}>
              <label>
                <input
                  type="checkbox"
                  value={item.ticker}
                  checked={selectedIndex.includes(item.ticker)}
                  onChange={handleCheckboxChange}
                />
                {`${item.name}`}
              </label>
            </div>
          ))}
        </div>
        <br />
        <br />

        <h5>South East Asia Index</h5>
        <div className={styles.indexGrid}>
          {SouthEastAsia.map((item) => (
            <div key={item.ticker} className={styles.indexItem}>
              <label>
                <input
                  type="checkbox"
                  value={item.ticker}
                  checked={selectedIndex.includes(item.ticker)}
                  onChange={handleCheckboxChange}
                />
                {`${item.name}`}
              </label>
            </div>
          ))}
        </div>
        <br />
        <br />

        <h5>Futures</h5>
        <div className={styles.indexGrid}>
          {Item.map((item) => (
            <div key={item.ticker} className={styles.indexItem}>
              <label>
                <input
                  type="checkbox"
                  value={item.ticker}
                  checked={selectedIndex.includes(item.ticker)}
                  onChange={handleCheckboxChange}
                />
                {`${item.name}`}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.dataControll}>
          <button onClick={handleDeselectAll}>선택 해제</button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeButton;
