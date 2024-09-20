import React, { useEffect } from "react";
import { subscribeChannel } from "api/Coin/Bitget/comment";
import useWebSocket from "api/websocket";

function WebSocketComponent() {
  const url = "wss://ws.bitget.com/v2/ws/public";

  const handleMessage = (data) => {
    console.log("서버로부터 받은 데이터:", data);
  };

  const socket = useWebSocket(url, handleMessage);

  useEffect(() => {
    if (socket) {
      console.log("WebSocket 연결 성공!");
      subscribeChannel(socket, [
        {
          instType: "SPOT",
          channel: "candle1d",
          instId: "BTCUSDT",
        },
      ]);
      console.log("구독 요청을 보냈습니다.");
    }
  }, [socket]);

  return (
    <div>
      <h1>WebSocket SPOT Ticker 구독</h1>
      {/* 추가적인 UI 컴포넌트를 여기에 작성할 수 있습니다. */}
    </div>
  );
}

export default WebSocketComponent;
