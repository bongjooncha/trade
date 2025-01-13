from fastapi import APIRouter, Query, HTTPException, status
from services.account.bitget.wallet import *


bitget_router = APIRouter(
    tags = ["Bitget"]
)

# 지갑 잔액
@bitget_router.get("/wallet/{account}/{type}")
async def get_wallet_balance(account: str, type: str):
    return get_balance(account, type)

# 선물 포지션
@bitget_router.get("/positions/{account}")
async def get_positions(account: str):
    return get_futures_positions(account)

# 선물 오픈 주문
@bitget_router.get("/futures_orders/{account}")
async def get_open_orders(account: str):
    return get_open_futures_orders(account)

@bitget_router.get("/test")
async def test():
    open_orders = get_bitget_client('future').fetch_open_orders(symbol='BTC/USDT:USDT')
    return open_orders


