import React from "react";
import styles from "./style/index.module.css";

const IndexButton = ({
  title,
  elements,
  selected,
  setSelected,
}: {
  title: string;
  elements: any[];
  selected: string[];
  setSelected: (value: string[]) => void;
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((index) => index !== value));
    }
  };

  return (
    <div className={styles.indexButton}>
      <h5>{title}</h5>
      <div className={styles.indexGrid}>
        {elements.map((item) => (
          <div key={item.ticker} className={styles.indexItem}>
            <label>
              <input
                type="checkbox"
                value={item.ticker}
                checked={selected.includes(item.ticker)}
                onChange={handleCheckboxChange}
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
