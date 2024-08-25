import os
import dotenv
import ccxt

dotenv.load_dotenv()  # 환경 변수 로드

api_key = os.getenv('UPBIT_KEY')  # 환경 변수에서 API 키 불러오기
secret = os.getenv('UPBIT_SECRET')  # 환경 변수에서 시크릿 키 불러오기

# API 키와 시크릿 키가 있는지 확인
if not api_key or not secret:
    raise Exception("API key or secret key is missing. Please check your .env file.")

# Upbit 거래소 인스턴스 생성
exchange = ccxt.upbit({
    'apiKey': api_key,
    'secret': secret,
})

# 잔액 조회
balance = exchange.fetch_balance()
print(balance)
