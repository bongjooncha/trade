# 파일 설명

trade_back: 기존 백엔드(flask). 환율 및 지표, 업비트 기본 데이터 및 거래 기능 존재<br/>
trade_front: 기존 프론트엔드(react,js). 업비트 주기적으로 데이터 요청을 보내 그래프 형성, 환율 및 지표 그래프 완료.<br/>
<br/>
<br/>
public_back: 환율 및 지표 송출 기능 완료.<br/>
private_back: binance, bitget 잔고 확인 기능 존재.<br/>
tsfront: 기존 프론트엔드 코드를 ts로 변경 및 기능 추가 및 리스크 관리 기능 추가.

<br/>
<br/>
<br/>

# back 시작

cd tradeback</br>
pip install -r requirements.txt</br>

---

## .env 생성 이후 mysql 접속을 위해 아래와 같은 형식으로 입력

local_DB_HOST = localhost</br>
local_DB_USER = root</br>
local_DB_PASSWORD = 11111</br>

### or

AWS_DB_HOST = CLOUD URL</br>
AWS_DB_USER = root</br>
AWS_DB_PASSWORD = 11111</br>

---

#### 이후 tradeback에서

python app.py</br>

---

# front 시작

cd tradefront
npm install -m
