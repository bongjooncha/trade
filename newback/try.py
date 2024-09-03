from exchange.coin.bitget import Bitget
from exchange.config import config
import json

a = Bitget(config.BITGET_KEY,config.BITGET_SECRET,config.BITGET_PASSPHRASE)
markets = a.client.load_markets()


# JSON 파일로 저장
with open('markets.json', 'w', encoding='utf-8') as f:
    json.dump(markets, f, ensure_ascii=False, indent=4)

print("시장 데이터가 markets.json 파일로 저장되었습니다.")