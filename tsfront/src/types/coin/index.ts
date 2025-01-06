export interface CoinProps {
  symbol: string;
  price: number;
}

export interface TP_SL_Order {
  orderId: string;
  triggerPrice: number;
  amount: number | null;
}

export interface CoinFuturePositionProps {
  symbol: string; //코인명
  holdSide: string; //보유 방향
  positionAmt: number; //코인 수량
  marginSize: number; //실재 투입 금액
  leverage: number; //레버리지
  openPriceAvg: number; //평균 매입가
  unrealizedPL: number; //미실현 손익
  achievedProfits: number; //실현 손익
  markPrice: number; //현재가
  TP_SL: {
    //TP/SL 주문 정보
    SL: TP_SL_Order[];
    TP: TP_SL_Order[];
    errors: TP_SL_Order[];
  };
}

export interface CoinWalletBalanceProps {
  free: number;
  used: number;
  total: number;
}

export interface FutureTableProps {
  data: CoinFuturePositionProps[];
  walletBalance: CoinWalletBalanceProps;
}

// FutureTableAccordion types
export interface FutureTableAccordionBodyProps {
  SL: TP_SL_Order[];
  TP: TP_SL_Order[];
  amount: number;
  coin: string;
  openPrice: number;
}

export interface FutureTableAccordionTPSLProps {
  openPrice: number;
  orders: TP_SL_Order[];
  type: "익절" | "손절";
  amount: number;
}
