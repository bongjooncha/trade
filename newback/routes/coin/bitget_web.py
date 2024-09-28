import asyncio
import websockets
import json
import utils.technicalindicator as ti

data_store = {}
data_lock = asyncio.Lock()

class Bitget_web():
    def __init__(self):
        self.url = "wss://ws.bitget.com/v2/ws/public"
        self.ping_interval = 25

    @staticmethod
    def create_name(inst_id, channel):
        return f"{inst_id}_{channel}"
    
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
                    {
                        "instType": type,
                        "channel": "candle5m",
                        "instId": coin
                    },        
                    {
                        "instType": type,
                        "channel": "candle1H",
                        "instId": coin
                    },        
                    {
                        "instType": type,
                        "channel": "candle4H",
                        "instId": coin
                    }, 
                    {
                        "instType": type,
                        "channel": "candle1D",
                        "instId": coin
                    }, 
                    {
                        "instType": type,
                        "channel": "candle1W",
                        "instId": coin
                    }
                ]
        } 
  
    @staticmethod
    def unsubscribe_msg(type, coin):
        return {
            "op": "unsubscribe",
            "args": [                
                {
                    "instType": type,
                    "channel": "candle1m",
                    "instId": coin
                },        
                {
                    "instType": type,
                    "channel": "candle5m",
                    "instId": coin
                },        
                {
                    "instType": type,
                    "channel": "candle1H",
                    "instId": coin
                },        
                {
                    "instType": type,
                    "channel": "candle4H",
                    "instId": coin
                }, 
                {
                    "instType": type,
                    "channel": "candle1D",
                    "instId": coin
                }, 
                {
                    "instType": type,
                    "channel": "candle1W",
                    "instId": coin
                }
                ]
        }    
    
    async def send_ping(self, websocket):
        while True:
            try:
                await asyncio.sleep(self.ping_interval)
                await websocket.send("ping")
            except asyncio.CancelledError:
                break
            except Exception as e:
                print(f"ping 전송 오류: {e}")
                break
    
    async def handle_message(self, arg, data_entries):
        inst_id = arg.get("instId")
        channel = arg.get("channel")
        name = self.create_name(inst_id, channel)

        async with data_lock:
            data_store[name] = data_entries[-230:]
    
    async def handle_update(self, arg, data_entries):
        inst_id = arg.get("instId")
        channel = arg.get("channel")
        name = self.create_name(inst_id, channel)
        new_entry = data_entries[0]

        async with data_lock:
            if data_store[name][-1][0] == new_entry[0]:  
                data_store[name][-1] = new_entry
                print(data_store[name])
                async with data_lock:
                    d = ti.TechnicalIndicator(data_store[name])
                    d.bband(5)
                    for i in [5, 10, 20, 60, 120]:
                        d.ma(i)
                    print(d.data.tail())
            else:
                data_store[name].append(new_entry)
                data_store[name].pop(0)
                print(data_store[name])
                # async with data_lock:
                #     d = ti.TechnicalIndicator(data_store[name])
                #     d.bband(5)
                #     for i in [5, 10, 20, 60, 120]:
                #         d.ma(i)
                #     print(d.data.tail())
        
    async def subscribe(self, type, coin):
        async with websockets.connect(self.url) as websocket:
            await websocket.send(json.dumps(self.subscribe_msg(type, coin)))
            ping_task = asyncio.create_task(self.send_ping(websocket))
            while True:
                try:
                    message = await websocket.recv()
                    data = json.loads(message)
                    action = data.get("action")
                    arg = data.get("arg")
                    data_entries = data.get("data")

                    if action == "update":
                        await self.handle_update(arg, data_entries)
                    elif action == "snapshot":
                        await self.handle_message(arg, data_entries)

                except json.JSONDecodeError:  #ping 처리
                    pass
                except websockets.ConnectionClosed:
                    print("웹소켓 연결이 종료되었습니다.")
                    break
    
    def get_data_store(self):
        return data_store
