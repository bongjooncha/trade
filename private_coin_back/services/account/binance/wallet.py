import ccxt
from typing import Literal
import os
from config.settings import Binance_Config

# 사용자인증
def get_binance_client(type: Literal['', 'spot', 'future']):
    client_config = {
        'apiKey': Binance_Config.BINANCE_API_KEY,
        'secret': Binance_Config.BINANCE_SECRET,
    }    
    if type:
        client_config['options'] = {'defaultType': type}
    
    return ccxt.binance(client_config)

# 지갑 내 잔고 확인(type: str -> spot, future)
def get_balance(type: Literal['', 'spot', 'future']):
    client = get_binance_client(type)
    try:
        if type == 'spot':
            balance = client.fetch_balance()
            return balance
        elif type == 'future':
            balance = client.fetch_balance()
            return balance["USDT"]
    except ccxt.BaseError as e:
        return {"error": str(e)}

# 선물 포지션 확인
def get_futures_positions():
    client = get_binance_client('swap')
    try:
        positions = client.fetch_positions()
        filtered_positions = [
            {
                "symbol": position["info"]["symbol"],
                "holdSide": (position["info"]["positionSide"]).lower(),
                "marginSize": float(position["info"]["initialMargin"]),
                "leverage": round(float(position["info"]["notional"])/float(position["info"]["initialMargin"])),
                "openPriceAvg": float(position["info"]["entryPrice"]),
                "unrealizedPL": float(position["info"]["unRealizedProfit"]),
                "achievedProfits": float(position["info"]["entryPrice"])-float(position["info"]["breakEvenPrice"]),
                "markPrice": float(position["info"]["markPrice"])
            }
            for position in positions
        ]
        return filtered_positions
    except ccxt.BaseError as e:
        return {"error": str(e)}

# 선물 TP/SL 주문 확인
def get_open_futures_ts(coins: list[str]):
    client = get_binance_client('future')
    try:
        all_orders = []
        for coin in coins:
            orders = client.fetch_open_orders(symbol=coin)
            formatted_orders = {
                "coin_name": coin,
                "orders": [
                    {
                        "triggerPrice": order["triggerPrice"],
                        "type": order["type"],
                        "amount": order["amount"]
                    }
                    for order in orders
                ]    
            }
            all_orders.append(formatted_orders)
        return all_orders
    except ccxt.BaseError as e:
        return {"error": str(e)}
    
