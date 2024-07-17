#페이지별 필요 정보

## 지갑

##### 특이사항: krw의 경우 별도로 처리 필요

| 보유 자산명 | 보유량         | 평균매입가           | 현재가       | 매수금액         |
| ----------- | -------------- | -------------------- | ------------ | ---------------- |
| name(str)   | balance(float) | avg_buy_price(float) | price(float) | buy_price(float) |

ex)

```
Wallet에 data = [
    {
        "name": "BTC",
        "balance": 0.00339458,
        "avg_buy_price": 87850000,
        "unit_currency": "KRW",
        "current_price": 90766000,
        "total_price": 308112.44828
    },
    {
        "name": "KRW",
        "balance": 2029824.90483673,
        "avg_buy_price": 0,
        "unit_currency": "KRW",
        "current_price": 1,
        "total_price": 2029824.90483673
    },
    {
        "name": "SOL",
        "balance": 3.40419839,
        "avg_buy_price": 205598.46374457,
        "unit_currency": "KRW",
        "current_price": 226600,
        "total_price": 771391.355174
    }
]
```

<br>

## 차트

| css 명    | 시작, 끝, 최고, 최저가 | 거래량 | 종목명 |
| --------- | ---------------------- | ------ | ------ |
| container | ohlc                   | volume | market |
| container | ohlc                   | volume | market |

<br>

## 매매

#### 필요

| 지갑(얼마나 사거나 팔수 있는지+시장가) |
| -------------------------------------- |
| wallet                                 |

#### 사용

| 시장가 매수 | 시장가 매도 | 지정가 매수 | 지정가 매도 |
| ----------- | ----------- | ----------- | ----------- |
| market buy  | market sell | limit buy   | limit sell  |
