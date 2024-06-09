from flask import Flask, render_template
from upbit.upbit import upbit_api
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(upbit_api, url_prefix='/upbit')
CORS(app)

@app.route('/upbit')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
