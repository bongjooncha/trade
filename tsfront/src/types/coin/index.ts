export interface CoinFuturePosition {
  symbol: string;
  holdSide: string;
  marginSize: number;
  leverage: number;
  openPriceAvg: number;
  unrealizedPL: number;
  achievedProfits: number;
  markPrice: number;
}
