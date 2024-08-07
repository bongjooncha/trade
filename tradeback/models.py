import pymysql
import os

#place = "local" or "AWS"
def get_db_connection(place,schema_name):
    db_host = os.getenv(f'{place}_DB_HOST')
    db_user = os.getenv(f'{place}_DB_USER')
    db_password = os.getenv(f'{place}_DB_PASSWORD')
    return pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=schema_name,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )