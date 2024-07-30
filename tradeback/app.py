from flask import Flask, render_template
from exchange.exchange import exchange_api
from upbit.upbit import upbit_api
# from kiwoom.kiwoom import kiwoom_api
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(exchange_api,url_prefix='/exchange')
app.register_blueprint(upbit_api, url_prefix='/upbit')
# app.register_blueprint(kiwoom_api, url_prefix='/kiwoom')
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
