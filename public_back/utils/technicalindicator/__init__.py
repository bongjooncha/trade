import pandas as pd
import pandas_ta as ta

class TechnicalIndicator:
    def __init__(self, data):
        self.data = pd.DataFrame(data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume', 'coin_volume', 'cash_volume'])
        numeric_columns = ['open', 'high', 'low', 'close', 'volume', 'coin_volume', 'cash_volume']
        self.data[numeric_columns] = self.data[numeric_columns].astype(float)

    def ma(self, period):
        ma_column = f'MA_{period}'
        if ma_column not in self.data.columns:
            self.data[ma_column] = self.data['close'].rolling(window=period).mean()
        return self.data[ma_column]
    
    def bband(self, period):
        # BBands 계산 (데이터프레임에 추가하지 않고 별도로 저장)
        bbands = self.data.ta.bbands(close='close', length=period, append=False)
        lower = f'BBL_{period}_2.0'
        middle = f'BBM_{period}_2.0'
        upper = f'BBU_{period}_2.0'
        
        # 실제 존재하는지 확인
        existing_columns = [col for col in [lower, middle, upper] if col in bbands.columns]
        
        if len(existing_columns) < 3:
            print("경고: 예상된 BBands 컬럼이 모두 존재하지 않습니다.")
            print("현재 BBands 데이터프레임 컬럼:", bbands.columns.tolist())
            return bbands[existing_columns]
        
        return bbands[[lower, middle, upper]]
    
    def rsi(self, period):
        rsi_column = f'RSI_{period}'
        if rsi_column not in self.data.columns:
            self.data[rsi_column] = self.data.ta.rsi(close=self.data['close'], length=period, append=True)
        return self.data[rsi_column]