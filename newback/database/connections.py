from sqlmodel import SQLModel, Session, create_engine, MetaData
from sqlalchemy import inspect
from config import Config
import pymysql
# from models.index import stock_tables, currency_tables

config = Config()

# DB = "LOCAL" OR "AWS"
DB= "LOCAL"

SCHEMAS = ["exchange_info","index_info"]
engines ={
    db_name: create_engine(f"{getattr(config, DB+'_DB_URL_NO_DB_NAME')}+{db_name}",echo=True)
    for db_name in SCHEMAS
}

exchange_metadata = MetaData()
index_metadata = MetaData()

def conn():
    # 각 엔진에 대해 별도의 메타데이터 사용
    engines["index_info"].metadata.create_all(bind=engines["index_info"], tables=index_metadata.tables.values())
    engines["exchange_info"].metadata.create_all(bind=engines["exchange_info"], tables=exchange_metadata.tables.values())


def get_session(db_name):    
    if db_name not in engines:
        raise ValueError(f"데이터베이스 '{db_name}'이(가) 정의되지 않았습니다.")
    with Session(engines[db_name]) as session:
        yield session