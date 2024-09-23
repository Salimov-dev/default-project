import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { v4 } from "uuid";
import * as dayjs from "dayjs";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Token, User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
// enum
import { errorMessagesEnum } from "@error/enum/error-messages.enum";
// interface
import { Tokens } from "./interface";
// config
import { ConfigService } from "@nestjs/config";
// dto
import { LoginDto, RegisterDto } from "./dto";
// service
import { UserService } from "@user/user.service";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto) {
    const user: User = await this.userService
      .findOne(registerDto.email)
      .catch((err) => {
        this.logger.error(err);
        throw new BadRequestException(errorMessagesEnum.auth.register);
      });

    if (user) {
      throw new ConflictException(errorMessagesEnum.auth.registerConflict);
    }

    const hashedPassword = this.hashPassword(registerDto.password);
    const userData = { ...registerDto, password: hashedPassword };
    delete userData.passwordRepeat;

    return await this.prismaService.user
      .create({
        data: userData
      })
      .catch((err) => {
        this.logger.error(err);
        throw new BadRequestException(errorMessagesEnum.auth.register);
      });
  }

  async login(loginDto: LoginDto, res: Response, agent: string): Promise<void> {
    const user: User = await this.userService
      .findOne(loginDto.email)
      .catch((err) => {
        this.logger.error(err);
        throw new BadRequestException(errorMessagesEnum.auth.login);
      });

    if (!user) {
      this.logger.warn(errorMessagesEnum.auth.login);
      throw new UnauthorizedException(errorMessagesEnum.auth.login);
    }

    const isPasswordMatch = compareSync(loginDto.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(errorMessagesEnum.auth.login);
    }

    const tokens = this.generateTokens(user, agent);
    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookies(await tokens, res);
  }

  async refreshTokens(
    refreshToken: string,
    res: Response,
    agent: string
  ): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const token = await this.prismaService.token.findUnique({
      where: { token: refreshToken }
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.prismaService.token.delete({
      where: { token: refreshToken }
    });

    if (dayjs(token.exp) < dayjs()) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(token.userId);

    const tokens = this.generateTokens(user, agent);
    this.setRefreshTokenToCookies(await tokens, res);
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    res.cookie("refreshToken", tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get("NODE_ENV", "development") === "production", // TODO сделать enum на prod и dev режимы
      path: "/"
    });

    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }

  private async generateTokens(user: User, agent: string): Promise<Tokens> {
    const accessToken =
      "Bearer " +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        roles: user.roles
      });

    const refreshToken = await this.getRefreshToken(user.id, agent);
    const tokens = { accessToken, refreshToken };

    return tokens;
  }

  private async getRefreshToken(userId: string, agent: string): Promise<Token> {
    const currentDate = dayjs();
    const expireDate = currentDate.add(1, "month").toDate();

    const existingToken = await this.prismaService.token.findFirst({
      where: { userId, userAgent: agent }
    });

    const token = existingToken ? existingToken.token : "";

    return this.prismaService.token.upsert({
      where: { token },
      update: { token: v4(), exp: expireDate },
      create: {
        token: v4(),
        exp: expireDate,
        userId,
        userAgent: agent
      }
    });
  }
}
