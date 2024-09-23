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
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    // 오류 발생 시 처리
    socketInstance.onerror = (error) => {
      onError(error);
    };

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      if (socketInstance) socketInstance.close();
    };
  }, []);
  return socket;
};

export default useWebSocket;
