from fastapi import APIRouter
from models.index import Stock_Index

currency_router = APIRouter(
    tags=["Currency"]
)

@currency_router.post("/average")
async def get_index_average(index: Stock_Index):
    return {}

