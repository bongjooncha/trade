# from database.connections import engine
from config import Config

config = Config()
rdb = "LOCAL"

def conn(db_name):
    engin_url = getattr(config,f"{rdb}_DB_URL_NODBNAME")+db_name
