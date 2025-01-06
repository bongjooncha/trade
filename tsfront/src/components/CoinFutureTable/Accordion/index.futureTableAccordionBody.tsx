import styles from "./style/index.module.css";
import { FutureTableAccordionBodyProps } from "types/coin";

import FutureTableAccordionTPSL from "./index.futureTableAccordionTPSL";

const FutureTableAccordionBody: React.FC<FutureTableAccordionBodyProps> = ({
  SL,
  TP,
  amount,
  coin,
  openPrice,
}) => {
  return (
    <div className={styles.accordionBody}>
      <FutureTableAccordionTPSL
        openPrice={openPrice}
        orders={TP}
        type="익절"
        amount={amount}
      />
      <FutureTableAccordionTPSL
        openPrice={openPrice}
        orders={SL}
        type="손절"
        amount={amount}
      />
      <div className={styles.addOrder}>
        <input type="number" placeholder="Trigger Price" />
        <input type="number" placeholder="Amount" />
        <input type="number" placeholder="손익가" />
        <button>주문 추가</button>
      </div>
      보유: {amount}개<button>주문 전체 취소</button>
    </div>
  );
};

export default FutureTableAccordionBody;
