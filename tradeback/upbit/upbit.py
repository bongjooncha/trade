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


#Candle 확인    
@upbit_api.route('/candles', methods=['POST'])
def upbit_candles():
    market = request.json['market']
    interval = request.json['interval']  # e.g., 'minute1', 'day', etc.
    count = request.json['count']
    candles = pyupbit.get_ohlcv(market, interval=interval, count=count).reset_index().to_dict(orient='records')
    return jsonify(candles)
    
@upbit_api.route("/try")
def update_like():
    tickers = pyupbit.get_tickers("BTC")
    return jsonify(tickers)



#코인 매수    
@upbit_api.route('/chance')
def chance():
    chance = upbit.get_chance("KRW-BTC")
    return jsonify(chance)


