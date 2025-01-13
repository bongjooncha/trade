import React from "react";
import { Accordion } from "react-bootstrap";
import BasicInfo from "./index.basicInfo";
import FutureTableAccordion from "./Accordion/index";
import TP_SL from "./index.TP_SL";
import styles from "../style/index.module.css";

import { CoinFuturePositionProps } from "types/coin";

interface FutureTableBodyProps {
  data: CoinFuturePositionProps[];
}

const FutureTableBody: React.FC<FutureTableBodyProps> = ({ data }) => {
  return (
    <div className={styles.bodyRow}>
      {data.map((item, index) => (
        <Accordion flush key={item.symbol}>
          <Accordion.Header className={styles.BodyHeader}>
            <div className={styles.index}>{index + 1}</div>
            <div key={item.symbol} className={styles.row}>
              <BasicInfo item={item} />
              <TP_SL item={item} type="TP" />
              <TP_SL item={item} type="SL" />
            </div>
          </Accordion.Header>
          <FutureTableAccordion item={item} />
        </Accordion>
      ))}
    </div>
  );
};

export default FutureTableBody;
