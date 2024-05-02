import io from "socket.io-client";

export const socketService = io("https://mighty-mint-height.glitch.me");
socketService.connect();
