from flask import Blueprint, render_template, jsonify, request
from pykiwoom.kiwoom import *

kiwoom_api = Blueprint('kiwoom_api',__name__)

kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)


#업비트 wallet(내 자산 확인)
@kiwoom_api.route("/account_num")
def upbit_wallet():
    accounts = kiwoom.GetLoginInfo("ACCNO")                 # 전체 계좌 리스트
    return jsonify(accounts)

@kiwoom_api.route("/marketticker")
def upbit_wallet():
    kospi = kiwoom.GetCodeListByMarket('0')
    kosdaq = kiwoom.GetCodeListByMarket('10')
    etf = kiwoom.GetCodeListByMarket('8')
    name = kiwoom.GetMasterCodeName(kospi)
    return jsonify(name)


