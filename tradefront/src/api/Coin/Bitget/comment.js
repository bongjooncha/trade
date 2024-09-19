export const subscribeChannel = (socket, channels) => {
  const subscribeMessage = {
    op: "subscribe",
    args: channels,
  };
  socket.send(JSON.stringify(subscribeMessage));
};

export const unsubscribeChannel = (socket, channels) => {
  const unsubscribeMessage = {
    op: "unsubscribe",
    args: channels,
  };
  socket.send(JSON.stringify(unsubscribeMessage));
};
