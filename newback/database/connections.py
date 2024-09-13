import pymysql
from pymysql.cursors import DictCursor
from config import Config

config = Config()

# DB = "LOCAL" OR "AWS"
DB= "LOCAL"

def get_db_connection(schema_name):
    db_host = getattr(config, DB+'_DB_HOST')
    db_user = getattr(config, DB+'_DB_USER')
    db_password = getattr(config, DB+'_DB_PASSWORD')

    return pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=schema_name,
    charset='utf8mb4',
    cursorclass=DictCursor
    )





    