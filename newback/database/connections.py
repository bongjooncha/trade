from sqlmodel import SQLModel, Session, create_engine
from config import Config
from models.index import stock_tables, currency_tables

config = Config()

DB_NAMES = ["exchange_rage","index"]

# DB = "LOCAL" OR "AWS"
DB= "LOCAL"
engins = {
    db_name: create_engine(getattr(config,DB+"_DB_URL_NODBNAME"), echo=True)
    for db_name in DB_NAMES
}
def conn():
    for engin in engins.values():
        SQLModel.metadata.create_all(engin)

def get_session(db_name: str):
    if db_name not in engins:
        raise ValueError(f"DB에 {db_name}이 정의되지 않습니다")
    with Session(engins[db_name]) as session:
        yield session
