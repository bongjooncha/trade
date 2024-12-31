import { useState } from "react";
import styles from "./style/index.module.css";

const PercentCalculator = () => {
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [basePriceInput, setBasePriceInput] = useState<number | 100>(100);
  const [values, setValues] = useState<number[]>([0]);

  const addValueInput = () => {
    setValues([...values, 0]);
  };
  const deleteValueInput = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  const deleteAllValueInput = () => {
    setValues([0]);
  };

  const updateValueInput = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <div className={styles.percentCalculator}>
      <div className={styles.basePrice}>
        <h5 style={{ marginBottom: "2px" }}>base price</h5>
        <div>
          <span>현재가</span>
          <input
            type="number"
            value={basePrice ?? undefined}
            onChange={(e) => setBasePrice(Number(e.target.value))}
          />
        </div>
        <div>
          <span>투자금</span>
          <input
            type="number"
            value={basePriceInput}
            onChange={(e) => setBasePriceInput(Number(e.target.value))}
          />
          <span>코인 갯수: {(basePrice ?? 0) / (basePriceInput ?? 1)}</span>
        </div>
      </div>
      {values.map((value, index) => (
        <div key={index}>
          {index + 1}
          <input
            type="number"
            value={value}
            onChange={(e) => updateValueInput(index, Number(e.target.value))}
            placeholder={`값 ${index + 1}`}
          />
          {basePrice !== null && basePrice !== 0 && (
            <>
              <span>
                {(((value - basePrice) / basePrice) * 100).toFixed(2)}%
              </span>
              <span>
                {(basePriceInput * ((value - basePrice) / basePrice)).toFixed(
                  2
                )}
                $
              </span>
            </>
          )}
          <button onClick={() => deleteValueInput(index)}>삭제</button>
        </div>
      ))}
      <button onClick={addValueInput}>추가</button>
      <button onClick={deleteAllValueInput}>전체 삭제</button>
    </div>
  );
};

export default PercentCalculator;
