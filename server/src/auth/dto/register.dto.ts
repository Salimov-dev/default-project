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
import { errorMessagesEnum } from "src/error/enum/error-messages.enum";

export class RegisterDto {
  @IsString()
  name: string;

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

  @IsOptional()
  @IsString()
  banReason: string;
}
