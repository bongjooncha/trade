import React from "react";
import styles from "../style/index.module.css";

const FutureTableAccordionBody = ({
  SL,
  TP,
  position,
}: {
  SL: [number, number, string | null][];
  TP: [number, number, string | null][];
  position: number;
}) => {
  return (
    <div className={styles.accordionBody}>
      {position}개
      {SL.map((item, index) => (
        <div className={styles.accordionBodyItem}>
          <div className={styles.accordionBodyItemTitle}>손절 {item}</div>
        </div>
      ))}
      {TP.map((item, index) => (
        <div className={styles.accordionBodyItem}>
          <div className={styles.accordionBodyItemTitle}>익절 {item}</div>
        </div>
      ))}
    </div>
  );
};

export default FutureTableAccordionBody;
