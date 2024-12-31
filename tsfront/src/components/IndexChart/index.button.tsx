import React from "react";
import styles from "./style/index.module.css";
import { IndexButtonProps } from "types/index/indexButton";

const IndexButton: React.FC<IndexButtonProps> = ({
  elements,
  selected,
  handleCheckboxChange,
}) => {
  return (
    <div className={styles.indexButton}>
      <div className={styles.indexGrid}>
        {elements.map((item) => (
          <div key={item.ticker} className={styles.indexItem}>
            <label>
              <input
                type="checkbox"
                value={item.ticker}
                checked={selected.includes(item.ticker)}
                onChange={(e) => handleCheckboxChange(e)}
              />
              {` ${item.name}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexButton;
