import React from "react";
import { subscribeChannel, unSubscribeChannel } from "api/Coin/Bitget/comment";
import useWebSocket from "api/websocket";

function WebSocketComponent() {
  const handleMessage = (data) => {
    console.log("서버로부터 받은 데이터:", data);
  };

  const handleError = (error) => {
    console.error("WebSocket 오류:", error);
  };

  // WebSocket 연결 설정
  const socket = useWebSocket(
    "wss://ws.bitget.com/v2/ws/public",
    handleMessage,
    handleError
  );

  return (
    <div>
      <h1>WebSocket SPOT Ticker 구독</h1>
      <button
        onClick={() =>
          subscribeChannel(socket, [
            {
              instType: "SPOT",
              channel: "candle1m",
              instId: "BTCUSDT",
            },
          ])
        }
      >
        구독
      </button>
      <button
        onClick={() =>
          unSubscribeChannel(socket, [
            {
              instType: "SPOT",
              channel: "candle1m",
              instId: "BTCUSDT",
            },
          ])
        }
      >
        구취
      </button>
    </div>
  );
}

export default WebSocketComponent;
