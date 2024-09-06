from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from typing import Literal, ClassVar
from datetime import date


class IndexTableBase(SQLModel):
    Date: date = Field(primary_key=True)
    Open: float
    High: float
    Low: float
    Close: float


class Stock_Index(BaseModel):
    symbol: Literal['GC=F', 'BTC-USD', 'CL=F', '^GSPC',
                    '^NDX', '^IXIC', '^RUT', '^DJI', '^VIX',
                    '^KS11', '^KQ11', '^N225', '000001.SS', '399001.SZ',
                    '^HSI', '^FTSE', '^FCHI', '^GDAXI', '^BSESN', '^NSEI']
    
def create_stock_index_model(symbol: str):
    class_name = f"StockIndex_{symbol}"
    return type(class_name, (IndexTableBase,), {"__tablename__": symbol})

stock_tables = {symbol: create_stock_index_model(symbol) for symbol in Stock_Index.__fields__['symbol'].annotation.__args__}   


class Currency_Index(BaseModel):
    symbol: Literal[
        'KRW', 'EUR', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'CNY', 'HKD',
        'SGD', 'INR', 'MXN', 'BRL', 'ZAR', 'TRY', 'RUB', 'SEK', 'NOK',
        'DKK', 'PLN', 'ILS', 'HUF', 'CZK', 'THB', 'MYR', 'PHP', 'IDR'
    ]

def create_currency_index_model(symbol: str):
    class_name = f"CurrencyIndex_{symbol}"
    return type(class_name, (IndexTableBase, SQLModel), {"__tablename__": symbol})

currency_tables = {symbol: create_currency_index_model(symbol) for symbol in Currency_Index.__fields__['symbol'].annotation.__args__}
