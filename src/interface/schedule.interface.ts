import { UserProps } from "./account.interface";
import { IMentorProps } from "./mentor.interface";

export interface IMentorCallScheduleProps {
  mentorId: IMentorProps | string;
  slots: ISlotProps[];
  slotsDate: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISlotProps {
  _id?: string;
  time: string;
  booked: boolean;
  userId?: UserProps;
}
