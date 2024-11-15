from fastapi import APIRouter
from services.account.binance.wallet import *

binance_router = APIRouter(
    tags = ["Binance"]
)

@binance_router.get("/wallet/{type}")
async def get_wallet_balance(type: str):
    return get_balance(type)

@binance_router.get("/positions")
async def get_open_orders():
    return get_futures_positions()

@binance_router.get("/future_ts")
async def get_open_ts():
    return get_open_futures_ts(['ETH/USDT',"TIA/USDT"])

@binance_router.get("/try")
async def try_():
    return get_binance_client('future').fetch_open_orders(symbol='ETH/USDT')


