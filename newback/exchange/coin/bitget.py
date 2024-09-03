# from exchange.pexchange import ccxt
import ccxt
from exchange.utility import settings

class Bitget:
    def __init__(self):
        self.client = ccxt.bitget({
            'apiKey': settings.BITGET_KEY,
            'secret': settings.BITGET_SECRET,
            'password': settings.BITGET_PASSPHRASE, 
        })
        self.client.load_markets()

    
