import { formatNumber } from "utils/init";
import CurrentProffit from "./index.currentProffit";
import styles from "../style/index.module.css";

import { CoinFuturePositionProps } from "types/coin";

interface BasicInfoProps {
  item: CoinFuturePositionProps;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ item }) => {
  return (
    <>
      <div className={styles.type1}>{item.symbol}</div>
      <div
        className={styles.type2}
        style={{
          color: item.holdSide === "long" ? "pink" : "skyblue",
        }}
      >
        {item.holdSide}
      </div>
      <div className={styles.type3}>
        {formatNumber(item.marginSize * item.leverage) + "   "}
        USDT {"   "}
        <span className={styles.small}>(x {item.leverage})</span>
      </div>
      <div className={styles.type4}>{formatNumber(item.markPrice)}$</div>
      <div className={styles.type4}>{formatNumber(item.openPriceAvg)}$</div>
      <CurrentProffit item={item} />
    </>
  );
};

export default BasicInfo;
