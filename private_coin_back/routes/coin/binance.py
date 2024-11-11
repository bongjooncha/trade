from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional
from config import Binance

binance_router = APIRouter(
    tags = ["Binance"]
)

#region binance.fetch_balance() -> 지갑 잔고 확인
'''
# 변수 None -> spot, {'type': 'future'} -> 선물, {'type': 'margin'} -> 마진
'''
# endregion
@binance_router.post("/wallet")
async def get_wallet_balance(type: Optional[str] = Query(..., enum=["spot","future", "margin"])):
    x = Binance()
    params = {'type': type}
    wallet = x.client.fetch_balance(params)
    return wallet


# @binance_router.post("/order")
# async def order()