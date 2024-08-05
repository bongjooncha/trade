import sys
import os
from dotenv import load_dotenv
sys.path.append(os.getenv('file_location'))
load_dotenv()
from tradeback.models import get_db_connection
import pymysql

class index():
    def create_insert_to_table(data, ta_name, place):
        connection = get_db_connection(place,"index")
        table_name = f"`{ta_name}`"
        try:
            with connection.cursor() as cursor:
                # 테이블이 존재하지 않으면 생성
                create_table_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    Date DATE PRIMARY KEY,
                    Open FLOAT,
                    High FLOAT,
                    Low FLOAT,
                    Close FLOAT,
                    Volume FLOAT
                );
                """
                cursor.execute(create_table_query)

                # 데이터를 삽입
                insert_query = f"""
                INSERT INTO {table_name} (Date, Open, High, Low, Close, Volume)
                VALUES (%s, %s, %s, %s, %s, %s);
                """
                for record in data:
                    try:
                        cursor.execute(insert_query, (
                            record['Date'], 
                            record['Open'], 
                            record['High'], 
                            record['Low'], 
                            record['Close'], 
                            record['Volume'], 
                        ))
                    except pymysql.MySQLError as e:
                        if e.args[0] == 1062:  # Duplicate entry for key
                            continue  # 이 오류는 무시하고 계속 진행
                        else:
                            print(f"Error inserting record {record['Date']}: {e}")
            # 변경사항 커밋
            connection.commit()
        finally:
            connection.close()

    def delete_table(table_name,place):
        connection = get_db_connection(place,"exchange_rate")
        try:
            with connection.cursor() as cursor:
                # 테이블 삭제 쿼리 실행
                delete_query = f"DROP TABLE IF EXISTS {table_name};"
                cursor.execute(delete_query)
                print(f"{table_name} 테이블이 성공적으로 삭제되었습니다.")
            connection.commit()
        except pymysql.MySQLError as e:
            print(f"테이블 삭제 중 오류 발생: {e}")
        finally:
            connection.close()