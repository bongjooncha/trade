import styles from "../style/index.module.css";
import { formatNumber, formatTPSL } from "utils/init";
import { CoinFuturePositionProps } from "types/coin";

interface TP_SLProps {
  item: CoinFuturePositionProps;
  type: "TP" | "SL";
}

const TP_SL = ({ item, type }: TP_SLProps) => {
  return (
    <div className={styles.type1}>
      {formatTPSL(item.TP_SL[type]) === "-"
        ? "-"
        : formatNumber(
            (Number(formatTPSL(item.TP_SL[type])) - item.openPriceAvg) *
              item.positionAmt
          )}
      {formatTPSL(item.TP_SL[type]) !== "-" && (
        <span
          className={styles.small}
          style={{
            fontWeight: item.TP_SL[type].length > 1 ? "bold" : "normal",
          }}
        >
          (
          {(
            ((Number(formatTPSL(item.TP_SL[type])) - item.openPriceAvg) /
              item.openPriceAvg) *
            100
          ).toFixed(1)}
          %)
        </span>
      )}
    </div>
  );
};

export default TP_SL;
