import datetime

# 현재 날짜와 시간을 가져옵니다
current_time = datetime.datetime.now()

# 하루 전의 날짜를 계산합니다
one_day_ago = current_time - datetime.timedelta(days=1)

# 오늘 날짜를 YYYY-MM-DD 형식으로 출력합니다
print("오늘 날짜:", current_time.strftime("%Y-%m-%d"))

# 하루 전 날짜를 YYYY-MM-DD 형식으로 출력합니다
print("하루 전 날짜:", one_day_ago.strftime("%Y-%m-%d"))
