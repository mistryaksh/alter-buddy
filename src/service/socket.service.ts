import { io } from "socket.io-client";

export const socket = io("https://backend.alterbuddy.com" as string);
