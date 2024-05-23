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
  status?: callType;
}
export type callType =
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "PENDING"
  | "ACCEPTED";
