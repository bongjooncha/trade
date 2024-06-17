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
    surber = kiwoom.GetLoginInfo("GetServerGubun")

    print(surber)
    print(accounts)
    print(user_id)
    print(user_name)
    print(keyboard)
    print(firewall)
loginInfo()


# 마켓내 번호 호출 GetCodeListByMarket(ticker)
# 0: 코스피, 10:코스닥, 8: ETF
def codeListByMarket():
    codes = kiwoom.GetCodeListByMarket("0")
    names = []
    for code in codes:
        names.append(kiwoom.GetMasterCodeName(code))
    result_dict = dict(zip(codes, names))
    print(result_dict)

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
                            next=1)
    print(df)

def candle():
    df = kiwoom.block_request("opt10081",
                          종목코드="005930",
                          기준일자="20200424",
                          수정주가구분=1,
                          output="주식일봉차트조회",
                          next=0)
    print(df)
