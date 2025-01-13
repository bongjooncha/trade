import styles from "./style/index.module.css";
import { TP_SL_Order } from "types/coin";

import FutureTableAccordionTPSL from "./index.futureTableAccordionTPSL";

interface FutureTableAccordionBodyProps {
  SL: TP_SL_Order[];
  TP: TP_SL_Order[];
  amount: number;
  coin: string;
  openPrice: number;
  currentPrice: number;
}

const FutureTableAccordionBody: React.FC<FutureTableAccordionBodyProps> = ({
  SL,
  TP,
  amount,
  coin,
  openPrice,
  currentPrice,
}) => {
  return (
    <div className={styles.accordionBody}>
      <FutureTableAccordionTPSL
        openPrice={openPrice}
        orders={TP}
        type="익절"
        amount={amount}
        currentPrice={currentPrice}
      />
      <FutureTableAccordionTPSL
        openPrice={openPrice}
        orders={SL}
        type="손절"
        amount={amount}
        currentPrice={currentPrice}
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
