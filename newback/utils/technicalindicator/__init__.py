import pandas as pd
import pandas_ta as ta

class TechnicalIndicator:
    def __init__(self, data):
        self.data = pd.DataFrame(data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume', 'coin_volume', 'cash_volume'])

    def ma(self, period):
        self.data.ta.sma(close=self.data['close'], length=period, append=True)
        return self.data[f'MA_{period}']
    
    def bbband(self, period):
        self.data.ta.bbands(close=self.data['close'], length=period, append=True)
        return self.data[f'BBBAND_{period}']

    def rsi(self, period):
        self.data.ta.rsi(close=self.data['close'], length=period, append=True)
        return self.data[f'RSI_{period}']