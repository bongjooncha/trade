# back 시작

cd tradeback
pip install -r requirements.txt

## .env 생성 이후 mysql 접속을 위해 아래와 같은 형식으로 입력

local_DB_HOST = localhost
local_DB_USER = root
local_DB_PASSWORD = 11111
local_DB_NAME = DBNAME

#### 이후 tradeback에서

python app.py

# front 시작

cd tradefront
npm install -m
