import config
from flask import Blueprint, jsonify, request
from models import get_db_connection

exchange_api = Blueprint('exchange',__name__)

#평균가격 확인
@exchange_api.route("/average", methods=['POST'])
def exchange_average():
    country = request.json['country']
    conn = get_db_connection(config.DB,"exchange_rate")
    try:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT AVG(Close) FROM {country}")
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

#전체 Close price 받기
@exchange_api.route("/price", methods=['POST'])
def exchange_price():
    country = request.json['country']
    conn = get_db_connection(config.DB,"exchange_rate")
    try:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT Date,Close FROM {country}")
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
