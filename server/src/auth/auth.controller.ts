import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  Res
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import { Response } from "express";
import { Cookie } from "@common/decorators";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Get("refresh-tokens")
  async refreshTokens(
    @Cookie("refreshToken") refreshtoken: string,
    @Res() res: Response
  ) {
    return this.authService.refreshTokens(refreshtoken, res);
  }
}
