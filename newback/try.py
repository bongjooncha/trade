from exchange.coin.bitget import Bitget
from exchange.config import config

a = Bitget(config.BITGET_KEY,config.BITGET_SECRET,config.BITGET_PASSPHRASE)
markets = a.client.load_markets()

