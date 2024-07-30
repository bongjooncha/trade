import yfinance as yf

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

currency_pair = 'JPYKRW=X'
start_date = '2024-01-01'
end_date = '2024-01-02'
exchange_rate_data = get_exchange_rate(currency_pair,start_date,end_date)
print(exchange_rate_data)