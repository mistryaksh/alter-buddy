import { UserProps } from "./account.interface";
import { IMentorProps } from "./mentor.interface";

export interface IChatProps {
     users: {
          user: UserProps;
          mentor: IMentorProps;
     };
     sessionDetails: {
          roomId: string;
          roomToken: string;
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
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
export type callType = "REJECTED" | "ONGOING" | "COMPLETED" | "PENDING" | "ACCEPTED";
