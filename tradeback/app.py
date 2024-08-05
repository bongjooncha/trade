from flask import Flask
from flow.exchange.exchange import exchange_api
from flow.index.index import index_api
from upbit.upbit import upbit_api
# from kiwoom.kiwoom import kiwoom_api
from flask_cors import CORS

# 정각마다 실행
import schedule
import time
import threading
from flow.exchange.exchange_update import exchange_update
from flow.index.index_update import index_update

import datetime
current_time = datetime.datetime.now()
one_day_ago = current_time - datetime.timedelta(days=5)
start_date = one_day_ago.strftime("%Y-%m-%d")
end_date = current_time.strftime("%Y-%m-%d")
DB="AWS"

def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(3)

def update():
    exchange_update(start_date,end_date,DB)
    index_update(start_date,end_date,DB)


app = Flask(__name__)
app.register_blueprint(exchange_api,url_prefix='/exchange')
app.register_blueprint(index_api,url_prefix='/index')
app.register_blueprint(upbit_api, url_prefix='/upbit')
# app.register_blueprint(kiwoom_api, url_prefix='/kiwoom')
CORS(app)

if __name__ == '__main__':
    schedule.every().hour.at(":00").do(update)
    # 별도의 스레드에서 스케줄러 실행
    scheduler_thread = threading.Thread(target=run_schedule)
    scheduler_thread.start()
    app.run(debug=True, host='0.0.0.0')
