import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

class Bitget_Config:
    BITGET_API_KEY_MAIN = os.getenv("BITGET_API_KEY_MAIN")
    BITGET_SECRET_KEY_MAIN = os.getenv("BITGET_SECRET_KEY_MAIN")
    BITGET_PASSPHRASE_MAIN = os.getenv("BITGET_PASSPHRASE_MAIN")

    BITGET_API_KEY_SHORT = os.getenv("BITGET_API_KEY_SHORT")
    BITGET_SECRET_KEY_SHORT = os.getenv("BITGET_SECRET_KEY_SHORT")
    BITGET_PASSPHRASE_SHORT = os.getenv("BITGET_PASSPHRASE_SHORT")

class Binance_Config:
    BINANCE_API_KEY = os.getenv("BINANCE_API_KEY")
    BINANCE_SECRET = os.getenv("BINANCE_SECRET")

