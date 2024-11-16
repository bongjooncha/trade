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
  TP: [number, number | null][]; //TP
  SL: [number, number | null][]; //SL
}
