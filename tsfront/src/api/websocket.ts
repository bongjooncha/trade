import { QueryClient } from "@tanstack/react-query";

let ws: WebSocket | null = null;

export const connectWebSocket = (
  url: string,
  queryKey: string,
  queryClient: QueryClient
): WebSocket | null => {
  if (ws) {
    ws.close();
  }

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log("WebSocket connected");
    ws!.send(JSON.stringify({ type: "init", payload: {} }));
  };

  ws.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    queryClient.setQueryData([queryKey], parsedData);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("소켓 연결 종료 : ", ws?.readyState);
    ws = null;
  };

  return ws;
};

export const disconnectWebSocket = () => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.onclose = () => {
      console.log("소켓 연결 종료 : ", ws?.readyState);
    };
    ws = null;
  }
};
