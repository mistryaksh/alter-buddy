import io from "socket.io-client";

export const socketService = io("http://192.168.0.102:8080");
socketService.connect();
