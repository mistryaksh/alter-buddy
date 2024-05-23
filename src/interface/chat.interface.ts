import { UserProps } from "./account.interface";
import { IMentorProps } from "./mentor.interface";

export interface IChatProps {
  users: {
    user: UserProps;
    mentor: IMentorProps;
  };
  sessionDetails: {
    roomId: string;
    roomCode: {
      host: string;
      mentor: string;
    };
    roomName: string;
    description: string;
    callType: callType;
  };
  message: [
    {
      messageId: string;
      message: string;
      senderId: string;
      senderName: string;
      timestamp: string;
      topic: string;
    }
  ];
  status?: callStatus;
  createdAt?: string;
  updatedAt?: string;
}
export type callStatus =
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "PENDING"
  | "ACCEPTED";
export type callType = "video" | "audio" | "chat" | "all";
