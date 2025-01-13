import styles from "./style/index.module.css";

export default function FutureTableHead() {
  return (
    <div className={styles.headerRow}>
      <div className={styles.type1}>코인명</div>
      <div className={styles.type2}>롱/숏</div>
      <div className={styles.type3}>포지션</div>
      <div className={styles.type4}>현재가</div>
      <div className={styles.type4}>평단가</div>
      <div className={styles.type3}>손익</div>
      <div className={styles.type1}>익절액</div>
      <div className={styles.type1}>손절액</div>
    </div>
  );
}
