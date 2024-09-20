import { useEffect, useRef } from "react";

/**
 *@param {string} url
 *@param {function} onMessage
 */
// tradefront/src/api/websocket.js
const useWebSocket = (url, onMessage) => {
  const socketRef = useRef(null);
  const pingInterval = useRef(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log(`WebSocket 연결됨: ${url}`);

      pingInterval.current = setInterval(() => {
        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
          socketRef.current.send(JSON.stringify({ ping: "ping" }));
          console.log("Ping 메시지 전송");
        }
      }, 25000); // 25초 마다 ping
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    socketRef.current.onclose = (event) => {
      console.log(`WebSocket 연결 종료: ${url}`, event);
      setTimeout(() => {
        socketRef.current = new WebSocket(url);
      }, 5000); // 5초 후 재연결 시도
    };

    socketRef.current.onerror = (error) => {
      console.error(`WebSocket 오류 (${url}):`, error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (pingInterval.current) {
        clearInterval(pingInterval.current);
      }
    };
  }, [url]);

  return socketRef.current;
};

export default useWebSocket;
