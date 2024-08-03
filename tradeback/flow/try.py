import yfinance as yf

# S&P 500 지수 데이터 가져오기
sp500 = yf.Ticker("^GSPC")
sp500_data = sp500.history(period="1mo")  # 최근 한 달 데이터

# 다우 존스 지수 데이터 가져오기
dow = yf.Ticker("^DJI")
dow_data = dow.history(period="1mo")

# KOSPI 지수 데이터 가져오기
kospi = yf.Ticker("^KS11")
kospi_data = kospi.history(period="1mo")

print(sp500_data)
print(dow_data)
print(kospi_data)