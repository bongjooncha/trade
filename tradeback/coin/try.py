import ccxt
import os
import dotenv

dotenv.load_dotenv()
# API 키와 시크릿 키 설정
api_key = os.environ['BITGET_KEY']
secret = os.environ['BITGET_SECRET']
password = os.environ['BITGET_PASSPHRASE']

# Bitget 거래소 인스턴스 생성
exchange = ccxt.bitget({
    'apiKey': api_key,
    'secret': secret,
    'password': password, 
})


spot_balance = exchange.fetch_balance(params={"type": "spot"})
print("Spot Balance:", spot_balance)

# 선물 잔액 조회
futures_balance = exchange.fetch_balance(params={"type": "future"})  # Bitget에서 선물 계정은 'swap'으로 지정
print("Futures Balance:", futures_balance)

# earn_balance = exchange.fetch_balance(params={"type": "earn"})  # Bitget에서 선물 계정은 'swap'으로 지정
# print("earn Balance:", earn_balance)
