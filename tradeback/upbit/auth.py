import pyupbit
import os
import dotenv

def authen():
    dotenv.load_dotenv()
    access = os.environ['access_key']
    secret = os.environ['secret_key']
    upbit = pyupbit.Upbit(access, secret)

    return upbit