from flow.exchange.spl_controll.insert import get_exchange_rate
from flow.exchange.spl_controll.create_table import exchange
import config


def exchange_update(start_date,end_date):
    base = "USD"
    exes = [
        'KRW', 'EUR', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'CNY', 'HKD',
        'SGD', 'INR', 'MXN', 'BRL', 'ZAR', 'TRY', 'RUB', 'SEK', 'NOK',
        'DKK', 'PLN', 'ILS', 'HUF', 'CZK', 'THB', 'MYR', 'PHP', 'IDR'
    ]

    for ex in exes:
        currency_pair = ex+base+'=X'
        exchange_rate_data = get_exchange_rate(currency_pair,start_date,end_date)
        table_name = currency_pair.replace('=X', '')
        exchange.create_insert_to_table(exchange_rate_data['data'], table_name, config.DB)

