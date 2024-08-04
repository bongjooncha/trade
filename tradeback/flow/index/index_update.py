from tradeback.flow.index.spl_controll.insert import get_index
from tradeback.flow.index.spl_controll.create_table import index
import datetime

current_time = datetime.datetime.now()
one_day_ago = current_time - datetime.timedelta(days=1)

def index_update():
    tickers = {
        'GC=F': '금 선물', 'BTC-USD': '비트코인', 'CL=F': '원유 선물', '^GSPC': 'S&P 500', '^NDX': '나스닥 100',
        '^IXIC': '나스닥(전체)', '^RUT': '러셀 2000', '^DJI': '다우 존스', '^KS11': '코스피', '^KQ11': '코스닥',
        '^N225': '니케이 225', '^TOPX': '토픽스', '000001.SS': '상하이 종합', '399001.SZ': '선전 성분',
        '^HSI': '항셍 지수', '^FTSE': '영국 FTSE 100', '^FCHI': '프랑스 CAC 40', '^GDAXI': '독일 DAX',
        '^BSESN': '인도 센섹스', '^NSEI': '인도 니프티50', '^VNI': '베트남 호찌민'}

    for ticker in tickers:
        start_date = one_day_ago.strftime("%Y-%m-%d")
        end_date = current_time.strftime("%Y-%m-%d")
        index_data = get_index(ticker,start_date,end_date)
        table_name = tickers[ticker]
        index.create_insert_to_table(index_data['data'], table_name, "AWS")

