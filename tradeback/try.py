import pyupbit

chance = pyupbit.get_tickers("KRW")
price = pyupbit.get_current_price(chance)
print(price)