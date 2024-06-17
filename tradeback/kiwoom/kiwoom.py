from flask import Blueprint, jsonify, request
from pykiwoom.kiwoom import *

kiwoom_api = Blueprint('kiwoom_api',__name__)

kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)


#키움 모든 계좌 번호 불러오기
@kiwoom_api.route("/accounts_num")
def kiwoom_accounts_number():
    accounts = kiwoom.GetLoginInfo("ACCNO")
    return jsonify(accounts)

#업비트 계좌별 잔고 확인
@kiwoom_api.route("/account", methods = ['POST'])
def kiwoom_account():
    account = request.json['account']
    df = kiwoom.block_request("opw00018",
                          계좌번호=account,
                          비밀번호="",
                          비밀번호입력매체구분="00",
                          조회구분=2,
                          output="계좌평가잔고개별합산",
                          next=0)
    return jsonify(df)



#시장별 코드명 + 이름
@kiwoom_api.route("/tickers", methods = ['POST'])
def kiwoom_ticker():
    market = request.json['market']
    codes = kiwoom.GetCodeListByMarket(market)
    names = []
    for code in codes:
        names.append(kiwoom.GetMasterCodeName(code))
    result_dict = dict(zip(codes, names))
    return jsonify(result_dict)

#ohlc 정보
@kiwoom_api.route("candles")
def kiwoom_candles():
    df = kiwoom.block_request("opt10081",
                            종목코드="005930",
                            기준일자="20200424",
                            수정주가구분=1,
                            output="주식일봉차트조회",
                            next=0)
    return jsonify(df)