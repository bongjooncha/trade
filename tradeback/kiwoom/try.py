from pykiwoom.kiwoom import *

# 키움 로그인
kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)

#계정정보(GetLoginInfo)
def loginInfo():
    account_num = kiwoom.GetLoginInfo("ACCOUNT_CNT")        # 전체 계좌수
    accounts = kiwoom.GetLoginInfo("ACCNO")                 # 전체 계좌 리스트
    user_id = kiwoom.GetLoginInfo("USER_ID")                # 사용자 ID
    user_name = kiwoom.GetLoginInfo("USER_NAME")            # 사용자명
    keyboard = kiwoom.GetLoginInfo("KEY_BSECGB")            # 키보드보안 해지여부
    firewall = kiwoom.GetLoginInfo("FIREW_SECGB")           # 방화벽 설정 여부

    print(account_num)
    print(accounts)
    print(user_id)
    print(user_name)
    print(keyboard)
    print(firewall)


# 마켓내 번호 호출 GetCodeListByMarket(ticker)
# 0: 코스피, 10:코스닥, 8: ETF
def codeListByMarket():
    kospi = kiwoom.GetCodeListByMarket('0')
    kosdaq = kiwoom.GetCodeListByMarket('10')
    etf = kiwoom.GetCodeListByMarket('8')

    print(len(kospi), kospi)
    print(len(kosdaq), kosdaq)
    print(len(etf), etf)


# 코드로 이름 받아오기 GetMasterCodeName
def masterCodeName():
    kospi = kiwoom.GetCodeListByMarket('0')

    for i in kospi:
        name = kiwoom.GetMasterCodeName(i)
        if "LG" in name:
            print(name)

def TR():
    df = kiwoom.block_request("opt10001",
                            종목코드="005930",
                            output="주식기본정보",
                            next=0)
    print(df)
TR()
