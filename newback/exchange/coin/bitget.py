# from exchange.pexchange import ccxt
import ccxt


class Bitget:
    def __init__(self, key, secret, password=None):
        self.client = ccxt.bitget({
            'apiKey': key,
            'secret': secret,
            'password': password, 
        })
        
        self.client.load_markets()

    