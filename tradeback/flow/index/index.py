import config
from flask import Blueprint, jsonify, request
from models import get_db_connection

index_api = Blueprint('index',__name__)

#평균가격 확인
@index_api.route("/average", methods=['POST'])
def index_average():
    index = request.json['index']
    conn = get_db_connection(config.DB,"index")
    try:
        with conn.cursor() as cursor:
            query = "SELECT AVG(Close) FROM `{}`".format(index)
            cursor.execute(query)
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

#전체 Close price 받기
@index_api.route("/price", methods=['POST'])
def index_price():
    index = request.json['index']
    conn = get_db_connection(config.DB,"index")
    try:
        with conn.cursor() as cursor:
            query = "SELECT Date,Close FROM `{}`".format(index)
            cursor.execute(query)
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
