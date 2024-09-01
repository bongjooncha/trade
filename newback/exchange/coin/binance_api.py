from fastapi import APIRouter
from .binance import Binance

binance = APIRouter()

@binance.get("/wallet")
async def get_wallet() -> dict:
    return {"message": "Hello from FastAPI"}