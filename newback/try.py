from routes.config import Binance

a = Binance()
markets = a.client.fetch_balance()

print(markets)