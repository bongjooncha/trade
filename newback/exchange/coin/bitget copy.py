import ccxt
import os
import dotenv

dotenv.load_dotenv()
# API 키와 시크릿 키 설정
api_key = os.getenv('BITGET_KEY')
secret = os.getenv('BITGET_SECRET')
password = os.getenv('BITGET_PASSPHRASE')

if api_key is None or secret is None or password is None:
    print("API_KEY is not set.")

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
