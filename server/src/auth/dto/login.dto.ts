import { IsEmail, IsStrongPassword, MinLength } from "class-validator";
import { errorMessagesEnum } from "@auth/config";

export class LoginDto {
  @IsEmail(
    {},
    {
      message: errorMessagesEnum.auth.email
    }
  )
  email: string;

  @IsStrongPassword(
    {},
    {
      message: errorMessagesEnum.auth.password
    }
  )
  @MinLength(8, { message: errorMessagesEnum.auth.passwordMinLength })
  password: string;
}
