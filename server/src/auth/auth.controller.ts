import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import { Request, Response } from "express";
import { Cookie, Public, UserAgent } from "@common/decorators";
import dayjs from "dayjs";

const REFRESH_TOKEN = "refreshToken";

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

  @Get("logout")
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }

    await this.authService.removeRefreshToken(refreshToken);

    res.cookie(REFRESH_TOKEN, "", {
      httpOnly: true,
      secure: true,
      expires: new Date()
    });

    res.sendStatus(HttpStatus.OK);
  }

  @Get("refresh-tokens")
  async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string
  ) {
    return this.authService.refreshTokens(refreshToken, res, agent);
  }
}
