from fastapi import APIRouter, Depends, HTTPException, Request, Body
from database.connections import get_connection
from models.index import TableNameRequest

index_router = APIRouter(
    tags=["Index"]
)

@index_router.post("/{schema_name}/all")
def read_table_all(
    schema_name: str,
    request: TableNameRequest,
    conn = Depends(get_connection)
):
    if not schema_name.isidentifier():
        raise HTTPException(status_code=400, detail="유효하지 않은 스키마 이름입니다.")

    try:
        with conn.cursor() as cursor:
            query = f"SELECT * FROM `{request.table_name}`"
            cursor.execute(query)
            result = cursor.fetchall()
            return result 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@index_router.post("/{schema_name}")
def read_table(
    schema_name: str,
    request: TableNameRequest,
    conn = Depends(get_connection)
):
    if not schema_name.isidentifier():
        raise HTTPException(status_code=400, detail="유효하지 않은 스키마 이름입니다.")

    try:
        with conn.cursor() as cursor:
            query = "SELECT Date,Close FROM `{}`".format(request.table_name)
            cursor.execute(query)
            result = cursor.fetchall()
            return result 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@index_router.post("/{schema_name}/avg")
def read_table_avg(
    schema_name: str,
    request: TableNameRequest,
    conn = Depends(get_connection)
):
    # 스키마 이름과 테이블 이름의 유효성 검사
    if not schema_name.isidentifier():
        raise HTTPException(status_code=400, detail="유효하지 않은 스키마 이름입니다.")

    try:
        with conn.cursor() as cursor:
            query = "SELECT AVG(Close) FROM `{}`".format(request.table_name)
            cursor.execute(query)
            result = cursor.fetchall()
            return result 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))