import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword
} from "class-validator";
import { errorMessagesEnum } from "src/error/enum/error-messages.enum";

export class CreateUserDto {
  // TODO проработать валидацию
  @IsString()
  name: string;

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

  @IsBoolean()
  @IsOptional()
  banned: boolean;

  // TODO сделать enum для причин блокировки
  @IsOptional()
  @IsString()
  banReason: string;
}
