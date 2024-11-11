from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from routes.index import *


app = FastAPI(default_response_class=ORJSONResponse)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get_data():
    return {"message": "Hello from FastAPI"}

app.include_router(index_router, prefix="/index")