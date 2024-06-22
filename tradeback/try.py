from pykiwoom.kiwoom import *
import pandas as pd

kiwoom = Kiwoom()
kiwoom.CommConnect(block=True)

account = '5234695511'

def get_account_info(account):
    result = kiwoom.block_request("opw00018",
                                  계좌번호=account,
                                  비밀번호="",
                                  비밀번호입력매체구분="00",
                                  조회구분=2,
                                  output="계좌평가잔고개별합산",
                                  next=0)
    return result

def process_account_info(result):
    # Assuming 'result' is a dictionary or similar structure
    # Convert to DataFrame if necessary
    df = pd.DataFrame(result)
    
    # Perform any necessary synchronous operations on the DataFrame
    # For example, accessing specific columns, calculations, etc.
    return df

if __name__ == "__main__":
    # Get account information
    account_info = get_account_info(account)
    
    # Process the account information (convert to DataFrame, perform operations)
    df = process_account_info(account_info)
    
    # Print or do further processing with the DataFrame
    print(df)
