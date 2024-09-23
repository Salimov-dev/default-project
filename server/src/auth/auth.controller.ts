import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import { Request, Response } from "express";
import { Cookie, Public, UserAgent } from "@common/decorators";

@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string
  ) {
    return this.authService.login(loginDto, res, agent);
  }

  @Get("refresh-tokens")
  async refreshTokens(
    @Cookie("refreshToken") refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string
  ) {
    return this.authService.refreshTokens(refreshToken, res, agent);
  }
}
