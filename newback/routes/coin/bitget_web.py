import asyncio
import websockets
import json

class Bitget_web():
    def __init__(self):
        self.url = "wss://ws.bitget.com/v2/ws/public"
        self.ping_interval = 25

    @staticmethod
    def create_name(inst_type, inst_id):
        return f"{inst_type}_{inst_id}"
    
    @staticmethod
    def subscribe_msg(type, coin):
        return {
            "op": "subscribe",
            "args": [                
                {
                    "instType": type,
                    "channel": "candle1m",
                    "instId": coin
                },        
                # {
                #     "instType": type,
                #     "channel": "candle5m",
                #     "instId": coin
                # },        
                # {
                #     "instType": type,
                #     "channel": "candle1H",
                #     "instId": coin
                # },        
                # {
                #     "instType": type,
                #     "channel": "candle4H",
                #     "instId": coin
                # }, 
                # {
                #     "instType": type,
                #     "channel": "candle1D",
                #     "instId": coin
                # }, 
                # {
                #     "instType": type,
                #     "channel": "candle1W",
                #     "instId": coin
                # }
                ]
        }     
    
    async def send_ping(self, websocket):
        while True:
            try:
                await asyncio.sleep(self.ping_interval)
                await websocket.send(json.dumps({"op": "ping"}))
                print("ping 전송됨.")
            except asyncio.CancelledError:
                break
            except Exception as e:
                print(f"ping 전송 오류: {e}")
                break
    
    async def subscribe(self, type, coin):
        async with websockets.connect(self.url) as websocket:
            await websocket.send(json.dumps(self.subscribe_msg(type, coin)))
            print("구독 요청 전송됨.")

            while True:
                try:
                    message = await websocket.recv()
                    data = json.loads(message)
                    print(data)
                except websockets.ConnectionClosed:
                    print("웹소켓 연결이 종료되었습니다.")
                    break
                except Exception as e:
                    print(f"오류 발생: {e}")
                    break
