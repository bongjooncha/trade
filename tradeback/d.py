import asyncio
from concurrent.futures import ThreadPoolExecutor
from pykiwoom.kiwoom import *

kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)

# 동기 함수 래핑
def sync_block_request(account):
    print(account)
    df = kiwoom.block_request("opw00018",
                                계좌번호=account,
                                비밀번호="",
                                비밀번호입력매체구분="00",
                                조회구분=2,
                                output="계좌평가잔고개별합산",
                                next=0)
    return df

# 비동기 함수 정의
async def async_block_request(account):
    print(2)
    loop = asyncio.get_event_loop()
    print(3)
    with ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(pool, sync_block_request, account)
    return result

# 사용 예시
async def main():
    account = '5234695511'
    print(1)
    result = await async_block_request(account)
    print(result)

# 이벤트 루프 실행
if __name__ == "__main__":
    print(0)
    asyncio.run(main())
