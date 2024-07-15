#페이지별 필요 정보

## 지갑

##### 특이사항: krw의 경우 별도로 처리 필요

| 보유 자산명 | 보유량         | 평균매입가           | 현재가       | 매수금액         |
| ----------- | -------------- | -------------------- | ------------ | ---------------- |
| name(str)   | balance(float) | avg_buy_price(float) | price(float) | buy_price(float) |

<br>

## 차트

| css 명    | 시작, 끝, 최고, 최저가 | 거래량 | 종목명 |
| --------- | ---------------------- | ------ | ------ |
| container | ohlc                   | volume | market |
| container | ohlc                   | volume | market |

<br>

## 매매

| 시장가 매수 | 시장가 매도 | 지정가 매수 | 지정가 매도 |
| ----------- | ----------- | ----------- | ----------- |
| market buy  | market sell | limit buy   | limit sell  |
