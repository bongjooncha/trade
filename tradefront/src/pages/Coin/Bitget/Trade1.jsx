import React, { useState, useEffect, useRef } from "react";
import { subscribeChannel, unsubscribeChannel } from "api/Coin/Bitget/comment";

function WebSocketComponent() {
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket 인스턴스 생성
    socketRef.current = new WebSocket("wss://ws.bitget.com/v2/ws/public");

    socketRef.current.onopen = () => {
      console.log("1");
    };

    // 서버로부터 지속해서 데이터 받기
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("서버로부터 받은 데이터:", data); // 서버에서 받은 데이터 로그
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };
    socketRef.current.onclose = (event) => {
      console.log("WebSocket 연결이 종료되었습니다.", event);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket SPOT Ticker 구독</h1>
      <button
        onClick={() =>
          subscribeChannel(socketRef.current, [
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
          unsubscribeChannel(socketRef.current, [
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
