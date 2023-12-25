import io from "socket.io-client";

export const socketService = io("https://alter-buddy-backend-2.onrender.com");
socketService.connect();
