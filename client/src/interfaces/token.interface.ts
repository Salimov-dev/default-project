import { IUser } from "./user.interface";

export interface IToken {
  token: string;
  exp: Date;
  user: IUser;
  userId: string;
  userAgent: string;
}
