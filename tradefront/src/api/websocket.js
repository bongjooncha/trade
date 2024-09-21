import { useEffect, useRef } from "react";

const useWebSocket = (url, onMessage, onError) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket 인스턴스 생성
    socketRef.current = new WebSocket(url);

    // 메시지 수신 시 처리
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    // 오류 발생 시 처리
    socketRef.current.onerror = (error) => {
      onError(error);
    };

    socketRef.current.open = () => {
      return socketRef.current;
    };

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return socketRef.current;
};

export default useWebSocket;
