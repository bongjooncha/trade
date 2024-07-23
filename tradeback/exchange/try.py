import yfinance as yf

def get_exchange_rate(currency_pair):
    start_date = '2022-01-01'
    end_date = '2024-01-01'
    data = yf.download(currency_pair, start=start_date, end=end_date)
    data.reset_index(inplace=True)
    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')
    response = {
        'currency_pair': currency_pair,
        'data': data.to_dict(orient='records')
    }
    return response

def get_current_exchange_rate(currency_pair):
    ticker = yf.Ticker(currency_pair)
    todays_data = ticker.history(period='1d')
    current_rate = todays_data['Close'].iloc[-1] if not todays_data.empty else None
    return current_rate

currency_pair = 'JPYKRW=X'
exchange_rate_data = get_current_exchange_rate(currency_pair)
print(exchange_rate_data)