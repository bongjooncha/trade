import React from "react";
import styles from "./style/index.module.css";
import { BaseButtonProps } from "types/index/indexButton";

const BaseButton: React.FC<BaseButtonProps> = ({
  baseCurrency,
  handleChange,
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
