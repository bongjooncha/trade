from dotenv import load_dotenv
import os
from functools import lru_cache

load_dotenv()

class Config:
    @lru_cache()
    def get(self, key, default=None):
        return os.getenv(key, default)

    @property
    @lru_cache()
    def DB_HOST(self):
        return self.get('AWS_DB_HOST')

    @property
    @lru_cache()
    def DB_USER(self):
        return self.get('AWS_DB_USER')

    @property
    @lru_cache()
    def DB_PASSWORD(self):
        return self.get('AWS_DB_PASSWORD')

    @property
    @lru_cache()
    def BINANCE_KEY(self):
        return self.get('BINANCE_KEY')

    @property
    @lru_cache()
    def BINANCE_SECRET(self):
        return self.get('BINANCE_SECRET')

    @property
    @lru_cache()
    def BITGET_KEY(self):
        return self.get('BITGET_KEY')

    @property
    @lru_cache()
    def BITGET_SECRET(self):
        return self.get('BITGET_SECRET')

    @property
    @lru_cache()
    def BITGET_PASSPHRASE(self):
        return self.get('BITGET_PASSPHRASE')

    @property
    @lru_cache()
    def WHITELIST(self):
        return self.get('WHITELIST', '').split(',')

    @property
    @lru_cache()
    def PORT(self):
        return int(self.get('PORT', 80))

config = Config()