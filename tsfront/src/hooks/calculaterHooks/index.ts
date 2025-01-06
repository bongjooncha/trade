import { useState } from "react";

export const useCalculater = () => {
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
  return {
    basePrice,
    setBasePrice,
    basePriceInput,
    setBasePriceInput,
    values,
    addValueInput,
    deleteValueInput,
    deleteAllValueInput,
    updateValueInput,
  };
};
