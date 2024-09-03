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
        self.position_mode = "hedge"
            
    def check_balance(self):
        balance = self.client.fetch_balance()
        return(balance)
    

    # 선물 주문 생성
    def create_futures_order(self,symbol, side, amount, price=None, order_type='market'):
        params = {
            'symbol': symbol,
            'side': side,  # 'buy' or 'sell'
            'amount': amount,
            'type': order_type,  # 'limit' or 'market'
        }
        
        if price is not None:
            params['price'] = price
        
        order = self.client.create_order(**params)
        print(order)
