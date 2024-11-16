import React from "react";
import styles from "../style/index.module.css";

export default function FutureTableHead() {
  return (
    <thead>
      <tr>
        <th className={styles.type1}>코인명</th>
        <th className={styles.type2}>롱/숏</th>
        <th className={styles.type3}>포지션</th>
        <th className={styles.type3}>현재가 / 평단가</th>
        <th className={styles.type3}>손익</th>
        <th className={styles.type1}>익절액</th>
        <th className={styles.type1}>손절액</th>
      </tr>
    </thead>
  );
}
