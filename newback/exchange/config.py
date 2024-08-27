from dotenv import load_dotenv
import os

class Config:
    def __init__(self):
        load_dotenv()
        self.BINANCE_KEY = os.getenv('BINANCE_KEY')
        self.BINANCE_SECRET = os.getenv('BINANCE_SECRET')

        self.UPBIT_KEY = os.getenv('UPBIT_KEY')
        self.UPBIT_SECRET = os.getenv('UPBIT_SECRET')

        self.BYBIT_KEY = os.getenv('BYBIT_KEY')
        self.BYBIT_SECRET = os.getenv('BYBIT_SECRET')

        self.OKX_KEY = os.getenv('OKX_KEY')
        self.OKX_SECRET = os.getenv('OKX_SECRET')
        self.OKX_PASSPHRASE = os.getenv('OKX_PASSPHRASE')
        
        self.BITGET_KEY = os.getenv('BITGET_KEY')
        self.BITGET_SECRET = os.getenv('BITGET_SECRET')
        self.BITGET_PASSPHRASE = os.getenv('BITGET_PASSPHRASE')

config = Config()