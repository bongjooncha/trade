import { useEffect, useState } from "react";

const useWebSocket = (url, onMessage, onError) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocket 인스턴스 생성
    const socketInstance = new WebSocket(url);
    setSocket(socketInstance);

    socketInstance.open = () => {
      return socketInstance;
    };

    // 메시지 수신 시 처리
    socketInstance.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        // JSON 파싱에 실패하면 메시지를 그대로 처리하거나 무시할 수 있습니다.
        if (event.data !== "pong") {
          console.warn("알 수 없는 메시지 형식:", event.data);
        }
      }
    };

    // 오류 발생 시 처리
    socketInstance.onerror = (error) => {
      onError(error);
    };

    const pingInterval = setInterval(() => {
      if (socketInstance.readyState === WebSocket.OPEN) {
        socketInstance.send("ping");
      }
    }, 25000); // 25000밀리초 = 2.5초

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      if (socketInstance) socketInstance.close();
    };
  }, []);
  return socket;
};

export default useWebSocket;
