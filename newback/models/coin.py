from pydantic import BaseModel
from typing import Optional

class Wallet(BaseModel):
    type: Optional[str] = None
    