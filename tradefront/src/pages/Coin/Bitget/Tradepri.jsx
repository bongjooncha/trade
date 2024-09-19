import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

function WebSocketComponent() {
  const [ws, setWs] = useState(null);

  const apiKey = "bg_a55467a839d7b07a08652b5981dbb38b"; // 여기에 API 키를 입력하세요
  const passphrase = "sekki990328"; // 여기에 passphrase를 입력하세요
  const secretKey =
    "88667c29e3bd07c00a5788b4668dcbea83434f2ebdee5cee3eb91c261675b6e4"; // 여기에 secretKey를 입력하세요

  // 타임스탬프 생성 함수
  const getTimestamp = () => {
    return Math.floor(Date.now() / 1000);
  };

  // 서명 생성 함수
  const getSign = (timestamp) => {
    const content = timestamp + "GET" + "/user/verify";
    const hash = CryptoJS.HmacSHA256(content, secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const socket = new WebSocket("wss://ws.bitget.com/v2/ws/private");

    socket.onopen = () => {
      console.log("WebSocket 연결 성공!");
      setWs(socket);

      // 로그인 요청 보내기
      const timestamp = getTimestamp();
      const sign = getSign(timestamp);

      const loginMessage = {
        op: "login",
        args: [
          {
            apiKey: apiKey,
            passphrase: passphrase,
            timestamp: timestamp,
            sign: sign,
          },
        ],
      };

      socket.send(JSON.stringify(loginMessage));
      console.log("로그인 요청을 보냈습니다.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data", data);
      // 로그인 성공 후에 구독 요청 보내기
      if (data.event === "login" && data.code === 0) {
        const subscribeMessage = {
          op: "subscribe",
          args: [
            {
              instType: "SPOT",
              channel: "fill",
              instId: "default",
            },
          ],
        };
        socket.send(JSON.stringify(subscribeMessage)); // 구독 요청 보내기
        console.log("구독 요청을 보냈습니다."); // 구독 요청 전송 후 로그
      } else if (data.event === "error") {
        console.error("로그인 실패:", data);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    return () => {
      if (socket) socket.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket 로그인 및 구독</h1>
    </div>
  );
}

export default WebSocketComponent;
