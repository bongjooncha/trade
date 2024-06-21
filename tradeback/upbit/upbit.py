from flask import Blueprint, jsonify, request
from .auth import authen
import pyupbit

upbit_api = Blueprint('upbit_api',__name__)

upbit = authen()

#업비트 wallet(내 자산 확인)
@upbit_api.route("/wallet")
def upbit_wallet():
    wallet = upbit.get_balances()
    return jsonify(wallet)

#ticker 확인(KRW,BTC,USDT)
@upbit_api.route('/tickers', methods=['POST'])
def upbit_tickers():
    market = request.json['market']
    tickers = pyupbit.get_tickers(market)
    return jsonify(tickers)

#현재 가격 확인(ex. krw-btc)
@upbit_api.route('/current_price', methods=['POST'])
def ubpit_current_price():
    market = request.json['market']
    chance = pyupbit.get_current_price(market)
    return jsonify(chance)


#Candle 확인 (upbit api로 이전 완료)
# @upbit_api.route('/candles', methods=['POST'])
# def upbit_candles():
#     market = request.json['market']
#     interval = request.json['interval']  # e.g., 'minute1', 'day', etc.
#     count = request.json['count']
#     candles = pyupbit.get_ohlcv(market, interval=interval, count=count).reset_index().to_dict(orient='records')
#     return jsonify(candles)



#코인 매수/매도
def process_order(order_type, order_method):
    market = request.json.get('market')
    price = request.json.get('price')
    number = request.json.get('number')
    if order_type == 'limit':
        order_method(market, price, number)
    else:
        order_method(market, number)
    return jsonify({'status': 'success'})
# 지정가 매도
@upbit_api.route('/sell_limit_order', methods=['POST'])
def sell_limit():
    return process_order('limit', upbit.sell_limit_order)
# 지정가 매수
@upbit_api.route('/buy_limit_order', methods=['POST'])
def buy_limit():
    return process_order('limit', upbit.buy_limit_order)
# 시장가 매도
@upbit_api.route('/sell_market_order', methods=['POST'])
def sell_market():
    return process_order('market', upbit.sell_market_order)
# 시장가 매수
@upbit_api.route('/buy_market_order', methods=['POST'])
def buy_market():
    return process_order('market', upbit.buy_market_order)

# 주문 보기
def process_order_request(state=None):
    market = request.json.get('market')
    orders = upbit.get_order(market, state=state) if state else upbit.get_order(market)
    return jsonify(orders)
# 진행중인 주문
@upbit_api.route('/current_order', methods=['POST'])
def current_order():
    return process_order_request()
# 완료된 주문
@upbit_api.route('/finished_order', methods=['POST'])
def finished_order():
    return process_order_request(state="done")

#주문 취소
@upbit_api.route('/cancel_order', methods=['POST'])
def cancel_order():
    uuid = request.json.get("uuid")
    return upbit.cancel_order(uuid)