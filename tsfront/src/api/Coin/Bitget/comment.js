export const subscribeChannel = (socket, channels) => {
  if (socket.readyState === WebSocket.OPEN) {
    const subscribeMessage = {
      op: "subscribe",
      args: channels,
    };
    socket.send(JSON.stringify(subscribeMessage));
    console.log("구독 요청을 보냈습니다.");
  } else {
    console.log("WebSocket이 연결되지 않았습니다.");
  }
};

export const unSubscribeChannel = (socket, channels) => {
  if (socket.readyState === WebSocket.OPEN) {
    const unsubscribeMessage = {
      op: "unsubscribe",
      args: channels,
    };
    socket.send(JSON.stringify(unsubscribeMessage));
    console.log("구독 취소 요청을 보냈습니다.");
  } else {
    console.log("WebSocket이 연결되지 않았습니다.");
  }
};
