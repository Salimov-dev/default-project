import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponse implements User {
  id: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  userName: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  banned: boolean;
  banReason: string;
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
