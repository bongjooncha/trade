from pydantic import BaseModel

class TableNameRequest(BaseModel):
    table_name: str