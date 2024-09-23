import asyncio
from routes.coin import Bitget_web


async def main():
    bitget_web = Bitget_web()
    await bitget_web.subscribe(type="USDT-FUTURES", coin="BTCUSDT")

asyncio.run(main())



# import asyncio

# async def my_coroutine():
#     print("Hello")
#     await asyncio.sleep(3)
#     print("World!")

# async def print_numbers():
#     for i in range(1, 6):
#         print(i)
#         await asyncio.sleep(1)
        
# async def main():
#     await asyncio.gather(my_coroutine(), print_numbers())

# asyncio.run(main())