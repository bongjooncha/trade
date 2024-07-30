import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

#place = "local" or "AWS"
def get_db_connection(place):
    db_host = os.getenv(f'{place}_DB_HOST')
    db_user = os.getenv(f'{place}_DB_USER')
    db_password = os.getenv(f'{place}_DB_PASSWORD')
    db_name = os.getenv(f'{place}_DB_NAME')
    return pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )