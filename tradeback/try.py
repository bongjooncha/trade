import pyupbit

chance = pyupbit.get_tickers("BTC")
price = pyupbit.get_current_price(chance)
print(price)