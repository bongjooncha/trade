from fastapi import APIRouter, Query, HTTPException, status
from services.account.bitget.wallet import *


bitget_router = APIRouter(
    tags = ["Bitget"]
)

# 지갑 잔액
@bitget_router.get("/wallet/{type}")
async def get_wallet_balance(type: str):
    return get_balance(type)

# 선물 포지션
@bitget_router.get("/positions")
async def get_positions():
    return get_futures_positions()

# 선물 오픈 주문
@bitget_router.get("/futures_orders")
async def get_open_orders():
    return get_open_futures_orders()

@bitget_router.get("/test")
async def test():
    open_orders = get_bitget_client('future').fetch_open_orders(symbol='BTC/USDT:USDT')
    return open_orders


