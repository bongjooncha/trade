from flask import Blueprint, jsonify, request
import json
from pykiwoom.kiwoom import *  #kiwoom안 OnReceiveTrData()의 print()를 주석처리
from concurrent.futures import ThreadPoolExecutor
import asyncio
from functools import partial

kiwoom_api = Blueprint('kiwoom_api',__name__)
kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)

executor = ThreadPoolExecutor(max_workers=4)
# loop = asyncio.get_event_loop()

# 키움은 c++언어의 int를 str상태로 바꿔서 제공해서 숫자는 아래 함수 필요
def to_int(value):
    # 오류가 있다면 숫자로 변환
    try:
        return int(value)
    except ValueError:
        return value


#키움 모든 계좌 번호 불러오기
@kiwoom_api.route("/accounts_num")
def kiwoom_accounts_number():
    accounts = kiwoom.GetLoginInfo("ACCNO")
    return jsonify(accounts)

#업비트 계좌별 잔고 확인
'''존재하는 행 :["종목번호", "종목명", "평가손익", "수익률(%)", "매입가",
"전일종가", "보유수량", "매매가능수량", "현재가", "전일매수수량",
"전일매도수량", "금일매수수량", "금일매도수량", "매입금액",
"매입수수료", "평가금액", "평가수수료", "세금", "수수료합",
"보유비중(%)", "신용구분", "신용구분명", "대출일"]'''
def get_account_data(account):
    df = kiwoom.block_request("opw00018",
    계좌번호=account,
    비밀번호="",
    비밀번호입력매체구분="00",
    조회구분=2,
    output="계좌평가잔고개별합산",
    next=0)

    selected_columns = ["종목명", "평가손익", "수익률(%)", "매입가", "현재가", "매입금액", "매입수수료", "평가금액"]
    df.loc[:, selected_columns] = df[selected_columns].applymap(to_int)
    json_str = df.to_json(orient='records', force_ascii=False)
    return json.loads(json_str)

async def get_data_async(func, *args):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, partial(func, *args))

@kiwoom_api.route("/account", methods=['POST'])
async def kiwoom_account():
    account = request.json['account']
    data = await get_data_async(get_account_data, account)
    print(data)
    return jsonify(data)


@kiwoom_api.route("/taccount")
async def kiwoom_taccount():
    account = '5234695511'
    data = await get_data_async(get_account_data, account)
    return jsonify(data)

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

@kiwoom_api.route("please")
def please():
    d



"""
from flask import Blueprint, jsonify, request
import json
from pykiwoom.kiwoom import Kiwoom
from concurrent.futures import ThreadPoolExecutor, TimeoutError
import pandas as pd
import multiprocessing
import threading

kiwoom_api = Blueprint('kiwoom_api', __name__)
kiwoom = Kiwoom()

# 전역 락
kiwoom_lock = threading.Lock()

# Kiwoom 로그인
with kiwoom_lock:
    kiwoom.CommConnect(block=True)

executor = ThreadPoolExecutor(max_workers=4)

def to_int(value):
    try:
        return int(value)
    except ValueError:
        return value

@kiwoom_api.route("/accounts_num")
def kiwoom_accounts_number():
    with kiwoom_lock:
        accounts = kiwoom.GetLoginInfo("ACCNO")
    return jsonify(accounts)

def fetch_account_data(account):
    print(f"Fetching account data for: {account}")
    try:
        with kiwoom_lock:
            df = kiwoom.block_request("opw00018",
                                      계좌번호=account,
                                      비밀번호="",
                                      비밀번호입력매체구분="00",
                                      조회구분=2,
                                      output="계좌평가잔고개별합산",
                                      next=0)
        print(f"Data fetched for account {account}: {df.head()}")
        selected_columns = ["종목명", "평가손익", "수익률(%)", "매입가", "현재가", "매입금액", "매입수수료", "평가금액"]
        df[selected_columns] = df[selected_columns].applymap(to_int)
        json_str = df.to_json(orient='records', force_ascii=False)
        return json.loads(json_str)
    except Exception as e:
        print(f"Error fetching account data: {e}")
        return {"error": str(e)}

def get_account_data(account):
    with multiprocessing.Pool(1) as pool:
        result = pool.apply_async(fetch_account_data, (account,))
        try:
            return result.get(timeout=30)  # 30초 제한 시간 설정
        except multiprocessing.TimeoutError:
            print("Task timed out")
            return {"error": "Task timed out"}
        except Exception as e:
            print(f"Error in async task: {e}")
            return {"error": str(e)}

def get_data_async(func, *args):
    print(f"Submitting async task for: {func.__name__}")
    future = executor.submit(func, *args)
    return future

@kiwoom_api.route("/account", methods=['POST'])
def kiwoom_account():
    account = request.json['account']
    print(f"Received request for account: {account}")
    future = get_data_async(get_account_data, account)
    try:
        data = future.result(timeout=60)  # 60초 제한 시간 설정
        return jsonify(data)
    except TimeoutError:
        print("Task timed out")
        return jsonify({"error": "Task timed out"}), 504
    except Exception as e:
        print(f"Error in async task: {e}")
        return jsonify({"error": str(e)}), 500

@kiwoom_api.route("/taccount")
def kiwoom_taccount():
    account = '5234695511'
    print("Fetching taccount data")
    future = get_data_async(get_account_data, account)
    try:
        data = future.result(timeout=60)  # 60초 제한 시간 설정
        return jsonify(data)
    except TimeoutError:
        print("Task timed out")
        return jsonify({"error": "Task timed out"}), 504
    except Exception as e:
        print(f"Error in async task: {e}")
        return jsonify({"error": str(e)}), 500
"""