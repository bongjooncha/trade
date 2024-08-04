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
