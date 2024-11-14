import ccxt
from typing import Literal
import os
from config.settings import Bitget_Config

def get_bitget_client(type: Literal['', 'spot', 'future']):
    client_config = {
        'apiKey': Bitget_Config.BITGET_KEY,
        'secret': Bitget_Config.BITGET_SECRET,
        'password': Bitget_Config.BITGET_PASSPHRASE,
    }    
    if type:
        client_config['options'] = {'defaultType': type}
    
    return ccxt.bitget(client_config)

# type: str -> spot, future
def get_balance(type: Literal['', 'spot', 'future']):
    client = get_bitget_client(type)
    try:
        if type == 'spot':
            balance = client.fetch_balance()
            return balance
        elif type == 'future':
            balance = client.fetch_balance()
            return balance["USDT"]
    except ccxt.BaseError as e:
        return {"error": str(e)}
    
def get_futures_positions():
    client = get_bitget_client('swap')
    try:
        positions = client.fetch_positions()
        filtered_positions = [
            {
                "symbol": position["info"]["symbol"],
                "holdSide": position["info"]["holdSide"],
                "marginSize": float(position["info"]["marginSize"]),
                "leverage": int(position["info"]["leverage"]),
                "openPriceAvg": float(position["info"]["openPriceAvg"]),
                "unrealizedPL": float(position["info"]["unrealizedPL"]),
                "achievedProfits": float(position["info"]["achievedProfits"]),
                "markPrice": float(position["info"]["markPrice"]),
            }
            for position in positions
        ]
        return filtered_positions
    except ccxt.BaseError as e:
        return {"error": str(e)}

def get_open_futures_orders():
    client = get_bitget_client('swap')
    try:
        orders = client.fetch_open_orders()
        return orders
    except ccxt.BaseError as e:
        return {"error": str(e)}
