import { Accordion } from "react-bootstrap";
import { CoinFuturePositionProps } from "types/coin";
import FutureTableAccordionBody from "./index.futureTableAccordionBody";
import styles from "./style/index.module.css";

interface FutureTableAccordionProps {
  item: CoinFuturePositionProps;
}

const FutureTableAccordion: React.FC<FutureTableAccordionProps> = ({
  item,
}) => {
  return (
    <>
      <Accordion.Body
        className={styles.BodyBody}
        style={{ background: "grey" }}
      >
        <FutureTableAccordionBody
          coin={item.symbol}
          openPrice={item.openPriceAvg}
          currentPrice={item.markPrice}
          SL={item.TP_SL.SL}
          TP={item.TP_SL.TP}
          amount={item.positionAmt}
        />
      </Accordion.Body>
    </>
  );
};

export default FutureTableAccordion;
