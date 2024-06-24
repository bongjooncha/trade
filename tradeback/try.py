import json
import pandas as pd
from pykiwoom.kiwoom import *
import asyncio

kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)

account = '5234695511'

def to_int(value):
    # 오류가 있다면 숫자로 변환
    try:
        return int(value)
    except ValueError:
        return value

async def get_account_info(account):
    # 비동기 메서드를 사용하여 데이터 가져오기\
    print(0)
    df = await kiwoom.block_request("opw00018",
                                        계좌번호=account,
                                        비밀번호="",
                                        비밀번호입력매체구분="00",
                                        조회구분=2,
                                        output="계좌평가잔고개별합산",
                                        next=0)
    print(1)

    # 데이터프레임 처리
    selected_columns = ["종목명", "평가손익", "수익률(%)", "매입가", "현재가", "매입금액", "매입수수료", "평가금액"]
    df.loc[:, selected_columns] = df[selected_columns].applymap(to_int)

    # JSON으로 변환하여 반환
    result_json = df.to_json(orient='records', force_ascii=False)
    result_list = json.loads(result_json)

    return result_list

# 비동기 함수를 실행할 수 있는 환경에서 호출하기 위해 asyncio.run() 사용
async def main():
    a = await get_account_info(account)
    print(a)

# asyncio.run()을 사용하여 비동기 함수 실행
asyncio.run(main())


