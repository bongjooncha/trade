import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

class Bitget_Config:
    BITGET_KEY = os.getenv("BITGET_KEY")
    BITGET_SECRET = os.getenv("BITGET_SECRET")
    BITGET_PASSPHRASE = os.getenv("BITGET_PASSPHRASE")
