import { IsPasswordsMatchingConstraint } from "@common/decorators";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
  Validate
} from "class-validator";
import { errorMessagesEnum } from "@auth/config";

export class RegisterDto {
  // TODO сделать ограничения по мин и макс символам, только латиница
  @IsString()
  userName: string;

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

  @IsStrongPassword(
    {},
    {
      message: errorMessagesEnum.auth.passwordRepeat
    }
  )
  @MinLength(8, { message: errorMessagesEnum.auth.passwordRepeatMinLength })
  @Validate(IsPasswordsMatchingConstraint)
  passwordRepeat: string;

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
