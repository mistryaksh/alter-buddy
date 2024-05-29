import { ICategoryProps, ISubCategoryProps } from "./category.interface";

interface IMentorNameProps {
  firstName: string;
  lastName: string;
}

interface IMentorContactProps {
  email: string;
  mobile: string;
  address: string;
}

export interface IMentorAuthProps {
  username: string;
  password: string;
}

interface IMentorAccountStatus {
  verification: boolean;
  block: boolean;
  online: boolean;
}

export interface IMentorProps {
  name: IMentorNameProps;
  contact: IMentorContactProps;
  auth: IMentorAuthProps;
  category: ICategoryProps;
  accountStatus: IMentorAccountStatus;
  acType: "MENTOR";
  subCategory: ISubCategoryProps[];
  specialists: string[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  inCall?: boolean;
  videoLink?: string;
  description?: string;
  roomName: string;
}

export interface ITopMentorProps {
  mentorId: IMentorProps;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  active: boolean;
}
