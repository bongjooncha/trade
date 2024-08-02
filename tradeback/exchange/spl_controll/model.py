import sys
sys.path.append('c:/Users/OWNER/Desktop/coding_project/autotrade_back_front/trade')
from tradeback.models import get_db_connection
import pymysql

class exchange():
    def create_insert_to_table(data, table_name, place):
        connection = get_db_connection(place)
        try:
            with connection.cursor() as cursor:
                # 테이블이 존재하지 않으면 생성
                create_table_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    Date DATE PRIMARY KEY,
                    Open FLOAT,
                    High FLOAT,
                    Low FLOAT,
                    Close FLOAT
                );
                """
                cursor.execute(create_table_query)

                # 데이터를 삽입
                insert_query = f"""
                INSERT INTO {table_name} (Date, Open, High, Low, Close)
                VALUES (%s, %s, %s, %s, %s);
                """
                for record in data:
                    try:
                        cursor.execute(insert_query, (
                            record['Date'], 
                            record['Open'], 
                            record['High'], 
                            record['Low'], 
                            record['Close'], 
                        ))
                    except pymysql.MySQLError as e:
                        pass
                        # print(f"Error inserting record {record['Date']}: {e}")
            # 변경사항 커밋
            connection.commit()
        finally:
            connection.close()

    def delete_table(table_name,place):
        connection = get_db_connection(place)
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