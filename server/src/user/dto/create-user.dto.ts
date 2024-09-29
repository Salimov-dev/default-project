import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword
} from "class-validator";
import { errorMessagesEnum } from "@auth/config";

export class CreateUserDto {
  // TODO проработать валидацию
  @IsString()
  userName: string;

  @IsStrongPassword(
    {},
    {
      message: errorMessagesEnum.auth.password
    }
  )
  password: string;

  @IsEmail(
    {},
    {
      message: errorMessagesEnum.auth.email
    }
  )
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  banned: boolean;

  @IsOptional()
  @IsString()
  banReason: string;
}
