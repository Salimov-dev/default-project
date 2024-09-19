import { ErrorService } from "./../../error/error.service";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword
} from "class-validator";

export class CreateUserDto {
  constructor(private readonly errorService: ErrorService) {}

  // TODO проработать валидацию
  @IsString()
  name: string;

  @IsStrongPassword(
    {},
    {
      message: this.messagesService.g
    }
  )
  password: string;

  @IsEmail(
    {},
    {
      message: "Email введен неверно"
    }
  )
  email: string;

  @IsBoolean()
  banned: boolean;

  @IsOptional()
  @IsString()
  banReason: string;
}
