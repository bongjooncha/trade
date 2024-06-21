from pykiwoom.kiwoom import * 
from functools import partial
kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)

account = '5234695511'

a = kiwoom.block_request("opw00018",
    계좌번호=account,
    비밀번호="",
    비밀번호입력매체구분="00",
    조회구분=2,
    output="계좌평가잔고개별합산",
    next=0)
print(a)