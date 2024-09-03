from fastapi import APIRouter
from .bitget import Bitget
from exchange.config import config

bitget_api = APIRouter()

a = Bitget(config.BITGET_KEY,config.BITGET_SECRET,config.BITGET_PASSPHRASE)

@bitget_api.get("/wallet")
async def get_wallet() -> dict:
    return a.client.load_markets()


