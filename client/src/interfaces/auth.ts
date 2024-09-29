import { BanReasonEnum, IUser, UserRoleEnum } from "./user.interface";

export interface IRegistrationUser
  extends Omit<IUser, "id" | "roles" | "banned" | "banReason" | "updatedAt"> {
  passwordRepeat: string;
  id?: string;
  roles?: UserRoleEnum[];
  banned?: boolean;
  banReason?: BanReasonEnum[];
  updatedAt?: Date;
}

export interface ILoginData {
  login: string;
  password: string;
}
