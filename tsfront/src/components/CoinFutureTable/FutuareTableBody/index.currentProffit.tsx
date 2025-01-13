import { formatNumber } from "utils/init";
import { CoinFuturePositionProps } from "types/coin";

import styles from "../style/index.module.css";

interface CurrentProffitProps {
  item: CoinFuturePositionProps;
}

const CurrentProffit: React.FC<CurrentProffitProps> = ({ item }) => {
  return (
    <div
      className={styles.type3}
      style={{
        color:
          item.unrealizedPL + item.achievedProfits > 0 ? "pink" : "skyblue",
      }}
    >
      {formatNumber(item.unrealizedPL)}
      USDT
      <span className={styles.small}>
        (
        {formatNumber(
          ((item.markPrice - item.openPriceAvg) * 100) / item.openPriceAvg
        )}
        %)
      </span>
    </div>
  );
};

export default CurrentProffit;
