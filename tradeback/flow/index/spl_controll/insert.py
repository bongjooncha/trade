import yfinance as yf
import sys
sys.path.append('c:/Users/OWNER/Desktop/coding_project/autotrade_back_front/trade')
from tradeback.flow.index.spl_controll.create_table import index

def get_index(ticker, start, end):
    data = yf.Ticker(ticker).history(start=start, end=end)
    data.reset_index(inplace=True)
    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')
    response = {
        'ticker': ticker,
        'data': data.to_dict(orient='records')
    }
    return response

tickers = {
    'GC=F': '금 선물', 'BTC-USD': '비트코인', 'CL=F': '원유_선물', '^GSPC': 'S&P_500', '^NDX': '나스닥_100',
    '^IXIC': '나스닥(전체)', '^RUT': '러셀 2000', '^DJI': '다우 존스', '^VIX': "VIX 지수", '^KS11': '코스피', '^KQ11': '코스닥',
    '^N225': '니케이 225', '^TOPX': '토픽스', '000001.SS': '상하이 종합', '399001.SZ': '선전 성분',
    '^HSI': '항셍 지수', '^FTSE': '영국 FTSE 100', '^FCHI': '프랑스 CAC 40', '^GDAXI': '독일 DAX',
    '^BSESN': '인도 센섹스', '^NSEI': '인도 니프티50', '^VNI': '베트남 호찌민'}

# # 생성 및 정보 입력
# for ticker in tickers:
#     print(ticker," 시작")
#     index_data = get_index(ticker,"2018-01-01", "2024-08-04")
#     index.create_insert_to_table(index_data['data'], ticker, "AWS")
#     print(ticker," 끝")

index_data = get_index("^VIX","2024-08-01", "2024-08-05")
index.create_insert_to_table(index_data['data'], "^VIX", "AWS")
