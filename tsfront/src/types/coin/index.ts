export interface CoinFuturePosition {
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

export interface TP_SL_Order {
  orderId: string;
  triggerPrice: number;
  amount: number | null;
}

export interface CoinWalletBalance {
  free: number;
  used: number;
  total: number;
}
