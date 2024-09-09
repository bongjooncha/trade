from sqlmodel import SQLModel, Field, MetaData
from datetime import date

class IndexTableBase(SQLModel):
    __abstract__ = True
    Date: date = Field(primary_key=True)
    Open: float
    High: float
    Low: float
    Close: float

def create_index_class(symbol, meta):
    class_name = symbol
    return type(class_name, (IndexTableBase,), {
        "table": True,
        "metadata": meta
    })

# Stock Index 심볼
stock_index_symbols = ['GC=F', 'BTC-USD', 'CL=F', '^GSPC', '^NDX', '^IXIC', '^RUT', '^DJI', '^VIX',
                       '^KS11', '^KQ11', '^N225', '000001.SS', '399001.SZ',
                       '^HSI', '^FTSE', '^FCHI', '^GDAXI', '^BSESN', '^NSEI']

# Exchange Rate 심볼
exchange_rate_symbols = ['KRW', 'EUR', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'CNY', 'HKD',
                         'SGD', 'INR', 'MXN', 'BRL', 'ZAR', 'TRY', 'RUB', 'SEK', 'NOK',
                         'DKK', 'PLN', 'ILS', 'HUF', 'CZK', 'THB', 'MYR', 'PHP', 'IDR']

stock_meta = MetaData()
exchange_meta = MetaData()

# 클래스 동적 생성
for symbol in stock_index_symbols:
    create_index_class(symbol, stock_meta)

for symbol in exchange_rate_symbols:
    create_index_class(symbol, exchange_meta)

