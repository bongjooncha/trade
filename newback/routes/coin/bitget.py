from fastapi import APIRouter, Query, HTTPException, status
import threading
from typing import Optional
from config import Bitget



bitget_router = APIRouter(
    tags = ["Bitget"]
)

#region bitget.fetch_balance() -> 지갑 잔고 확인
'''
# 변수 None -> spot, {'type': 'swap'} -> 선물, {'type': 'margin'} -> 마진
'''
# endregion
@bitget_router.post("/wallet")
async def get_wallet_balance(type: Optional[str] = Query(None, enum=["swap", "margin"])):
    x = Bitget()
    params = {}
    if type:
        params = {'type': type}
    wallet = x.client.fetch_balance(params)
    return wallet
