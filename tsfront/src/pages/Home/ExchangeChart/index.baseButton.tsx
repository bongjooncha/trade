import React from "react";
import styles from "./style/index.module.css";

const BaseButton = ({
  baseCurrency,
  handleChange,
}: {
  baseCurrency: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.base}>
      <h5>BASE</h5>
      <div className={styles.baseLabel}>
        <label>
          <input
            type="radio"
            value="USD"
            checked={baseCurrency === "USD"}
            onChange={handleChange}
          />
          USD(달라)
        </label>
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
  );
};

export default BaseButton;
