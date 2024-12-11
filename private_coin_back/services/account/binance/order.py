import ccxt
from config.settings import Binance_Config
from typing import Literal

def get_binance_client(type: Literal['', 'spot', 'future']):
    client_config = {
        'apiKey': Binance_Config.BINANCE_API_KEY,
        'secret': Binance_Config.BINANCE_SECRET,
    }    
    if type:
        client_config['options'] = {'defaultType': type}
    
    return ccxt.binance(client_config)

#symbol: 마켓명(str), position: 'buy'/'sell'(str), quantity: 수량(float)
#        type: 'STOP_MARKET'/'TAKE_PROFIT_MARKET'(str), price: 가격(float)
def set_sl_tp(symbol,position,quantity, price):
    client = get_binance_client('future')
    if position == 'buy': side = 'SHORT'
    else: side = 'LONG'
    try:
        stop = client.create_order(
            symbol=symbol,
            type='STOP_MARKET',
            side=position,
            amount=quantity,
            params={
                'stopPrice': price,
                'positionSide': side
            },)
        return(stop)
    except ccxt.BaseError as e:
        return(f"API 오류 발생: {e}")

def cancel_all_open_orders(symbol):
    client = get_binance_client('future')
    try:
        open_orders = client.fetch_open_orders(symbol)
        for order in open_orders:
            cancel_response = client.cancel_order(order['id'], symbol)
            return(cancel_response)
    except ccxt.BaseError as e:
        return(f"API 오류 발생: {e}")

def cancel_open_order(id, symbol):
    client = get_binance_client('future')
    try:
        cancel_response = client.cancel_order(id, symbol)
        return(cancel_response)
    except ccxt.BaseError as e:
        return(f"API 오류 발생: {e}")

