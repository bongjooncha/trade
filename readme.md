cd tradeback
pip install -r requirements.txt

.env 생성 이후 mysql 접속을 위해 아래와 같은 형식으로 입력
local_DB_HOST = localhost
local_DB_USER = root
local_DB_PASSWORD = 12345678
local_DB_NAME = exchange_rate

cd tradefront
npm install -m
