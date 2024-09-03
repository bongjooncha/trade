from exchange.coin.bitget import Bitget
import json
import ccxt

bitget = Bitget()
# markets = bitget.client.load_markets()

# print("USDT 마진 영구 계약:")
# for symbol, market in markets.items():
#     if market['swap'] and market['quote'] == 'USDT' and market['settle'] == 'USDT':
#         print(f"ID: {market['id']}, Symbol: {symbol}")


try:
    balance = bitget.client.fetch_balance({'type': 'swap'})
    print(balance)
    print("선물 잔액:")
    for currency in balance['total']:
        if balance['total'][currency] > 0:
            print(f"{currency}: {balance['free'][currency]} (사용 가능), {balance['used'][currency]} (사용 중), {balance['total'][currency]} (총액)")
except ccxt.ExchangeError as e:
    print(f'오류 발생: {str(e)}')

# print(bitget.client.set_leverage(10,'ETH/USD:ETH-240927'))

# symbol = 'ETH/USD:ETH-240927'  # 선물 거래 심볼
# type = 'market'  # 시장가 주문
# side = 'buy'
# amount = 0.01

# params = {
#     'marginMode': 'cross',  # 또는 'isolated'
#     'holdSide': 'long',  # 'long' 또는 'short'
# }

# try:
#     order = bitget.client.create_order(symbol, type, side, amount, None, params)
#     print(order)
# except ccxt.ExchangeError as e:
#     print(e)