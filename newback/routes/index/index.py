from fastapi import APIRouter, Depends, HTTPException, Request
from database.connections import get_db_connection
from fastapi.responses import JSONResponse

index_router = APIRouter(
    tags=["Index"]
)
def get_connection(schema_name: str):
    conn = get_db_connection(schema_name)
    try:
        yield conn
    finally:
        conn.close()

@index_router.get("/{schema_name}/{table_name}/all")
def read_table_all(schema_name: str, table_name: str, conn = Depends(get_connection)):
    # 스키마와 테이블 이름의 유효성 검사
    if not schema_name.isidentifier() or not table_name.isidentifier():
        raise HTTPException(status_code=400, detail="유효하지 않은 스키마 또는 테이블 이름입니다.")

    try:
        with conn.cursor() as cursor:
            query = f"SELECT * FROM `{table_name}`"
            cursor.execute(query)
            result = cursor.fetchall()
            return result  # FastAPI가 자동으로 JSON 응답으로 변환
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@index_router.get("/{schema_name}/{table_name}")
def read_table(schema_name: str, table_name: str, conn = Depends(get_connection)):
    # 스키마와 테이블 이름의 유효성 검사
    if not schema_name.isidentifier() or not table_name.isidentifier():
        raise HTTPException(status_code=400, detail="유효하지 않은 스키마 또는 테이블 이름입니다.")

    try:
        with conn.cursor() as cursor:
            query = f"SELECT Date,Close FROM `{table_name}`"
            cursor.execute(query)
            result = cursor.fetchall()
            return result  # FastAPI가 자동으로 JSON 응답으로 변환
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@index_router.get("/{schema_name}/{table_name}/avg")
def read_table(schema_name: str, table_name: str, conn = Depends(get_connection)):
    # 스키마와 테이블 이름의 유효성 검사
    if not schema_name.isidentifier() or not table_name.isidentifier():
        raise HTTPException(status_code=400, detail="유효하지 않은 스키마 또는 테이블 이름입니다.")

    try:
        with conn.cursor() as cursor:
            query = f"SELECT AVG(Close) FROM `{table_name}`"
            cursor.execute(query)
            result = cursor.fetchall()
            return result  # FastAPI가 자동으로 JSON 응답으로 변환
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

