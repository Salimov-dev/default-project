import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto";
import { UserService } from "@user/user.service";
import { Tokens } from "./interface";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Token, User } from "@prisma/client";
import { errorMessagesEnum } from "@error/enum/error-messages.enum";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { v4 } from "uuid";
import * as dayjs from "dayjs";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
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

  async login(loginDto: LoginDto): Promise<Tokens> {
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

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles
    });

    const refreshToken = await this.getRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string): Promise<Token> {
    const currentDate = dayjs();
    const expireDate = currentDate.add(1, "month").toDate();

    return this.prismaService.token.create({
      data: {
        token: v4(),
        exp: expireDate,
        userId
      }
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
