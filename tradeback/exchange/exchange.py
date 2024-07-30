from flask import Blueprint, jsonify, request
from models import get_db_connection

exchange_api = Blueprint('exchange',__name__)

#평균가격 확인
@exchange_api.route("average")
def exchange_average():
    # print(country)
    conn = get_db_connection("AWS")
    try:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT AVG(Close) FROM KRWUSD")
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()