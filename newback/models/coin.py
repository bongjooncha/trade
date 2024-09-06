from pydantic import BaseModel
from typing import Literal, Optional

class Wallet(BaseModel):
    type: Optional[str] = None

class Order(BaseModel):
    bs: Literal["buy","sell"]
    type: Literal["market","limit"]
    symbol: str
    amount: int
    print: int
    params: Literal["spot","future"]
    
class Leverage(BaseModel):
    symbor: str
    leverage: int
    mode: Literal["cross","isolated"]