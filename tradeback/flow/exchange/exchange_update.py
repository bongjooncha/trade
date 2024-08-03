from tradeback.flow.exchange.spl_controll.insert import get_exchange_rate
from tradeback.flow.exchange.spl_controll.create_table import exchange
import datetime

current_time = datetime.datetime.now()
one_day_ago = current_time - datetime.timedelta(days=1)

def exchange_update():
    base = "USD"
    exes = [
        'EUR', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'CNY', 'HKD',
        'SGD', 'INR', 'MXN', 'BRL', 'ZAR', 'TRY', 'RUB', 'SEK', 'NOK',
        'DKK', 'PLN', 'ILS', 'HUF', 'CZK', 'THB', 'MYR', 'PHP', 'IDR','KRW'
    ]

    for ex in exes:
        currency_pair = ex+base+'=X'
        start_date = one_day_ago.strftime("%Y-%m-%d")
        end_date = current_time.strftime("%Y-%m-%d")
        exchange_rate_data = get_exchange_rate(currency_pair,start_date,end_date)
        table_name = currency_pair.replace('=X', '')
        exchange.create_insert_to_table(exchange_rate_data['data'], table_name,"AWS")

