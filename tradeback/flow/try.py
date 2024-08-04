import yfinance as yf

def get_index(ticker, start, end):
    data = yf.Ticker(ticker).history(start=start, end=end)
    data.reset_index(inplace=True)
    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')
    response = {
        'ticker': ticker,
        'data': data.to_dict(orient='records')
    }
    return response

# 예시 티커로 함수 호출
index_data = get_index("GC=F", "2018-01-01", "2024-08-04")

# 반환된 데이터 구조 확인
print(index_data)
