export interface BiTickerDataProps {
  e: string; // 이벤트 타입
  E: number; // 이벤트 시간
  s: string; // 심볼
  k: {
    t: number; // 캔들 시작 시간
    T: number; // 캔들 종료 시간
    s: string; // 심볼
    i: string; // 간격
    f: number; // 첫 거래 ID
    L: number; // 마지막 거래 ID
    o: string; // 시가
    c: string; // 종가
    h: string; // 고가
    l: string; // 저가
    v: string; // 기초자산 거래량
    n: number; // 거래 횟수
    x: boolean; // 캔들 종료 여부
    q: string; // 거래 대금
    V: string; // 매수 거래량
    Q: string; // 매수 거래 대금
    B: string; // 무시
  };
}

export interface BiMarketDataProps {
  e: string; // 이벤트 타입
  E: number; // 이벤트 시간
  s: string; // 심볼
  p: string; // 마크 가격
  i: string; // 인덱스 가격
  P?: string; // 추정 결제 가격 (결제 시작 1시간 전 마지막 시간에만 유용)
  r: string; // 펀딩 비율
  T: number; // 다음 펀딩 시간
}
