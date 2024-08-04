import yfinance as yf
from tradeback.flow.exchange.spl_controll.create_table import exchange

def get_exchange_rate(currency_pair,start,end):
    start_date = start
    end_date = end
    data = yf.download(currency_pair, start=start_date, end=end_date)
    data.reset_index(inplace=True)
    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')
    response = {
        'currency_pair': currency_pair,
        'data': data.to_dict(orient='records')
    }
    return response


base = "USD"
exes = [
    'EUR','KRW', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'CNY', 'HKD',
    'SGD', 'INR', 'MXN', 'BRL', 'ZAR', 'TRY', 'RUB', 'SEK', 'NOK',
    'DKK', 'PLN', 'ILS', 'HUF', 'CZK', 'THB', 'MYR', 'PHP', 'IDR'
]

# 생성 및 정보 입력
for ex in exes:
    currency_pair = ex+base+'=X'
    start_date = '2018-01-01'
    end_date = '2019-12-31'
    exchange_rate_data = get_exchange_rate(currency_pair,start_date,end_date)
    table_name = currency_pair.replace('=X', '')
    exchange.create_insert_to_table(exchange_rate_data['data'], table_name,"AWS")

# 삭제
# for ex in exes:
#     marketname=ex+base
#     exchange.delete_table(marketname,"local")