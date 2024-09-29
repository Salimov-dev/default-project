import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { PrismaService } from "@prisma/prisma.service";
import { genSaltSync, hashSync } from "bcrypt";
import { errorMessagesEnum } from "@auth/config";
import { Role, User } from "@prisma/client";
import { UserResponse } from "./responses";
import { JwtPayload } from "@auth/interface";
import { ConfigService } from "@nestjs/config";
import { convertToSecondsUtil } from "@common/utils";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService
  ) {}

  async findAll() {
    return await this.prismaService.user
      .findMany()
      .then((users) => users.map((user) => new UserResponse(user)));
  }

  // TODO переделать в findByEmail
  async findOne(email: string, isReset = false): Promise<User> {
    if (isReset) {
      await this.cacheManager.del(email);
    }

    const user = await this.cacheManager.get<User>(email);
    if (!user) {
      const foundedUser = await this.prismaService.user.findUnique({
        where: {
          email
        }
      });

      if (!foundedUser) {
        return null;
      }

      const seconds = convertToSecondsUtil(this.configService.get("JWT_EXP"));
      await this.cacheManager.set(email, foundedUser, seconds);
      return foundedUser;
    }

    return user ? new UserResponse(user) : null;
  }

  async findById(id: string, isReset = false) {
    if (isReset) {
      await this.cacheManager.del(id);
    }

    const user = await this.cacheManager.get<User>(id);

    if (!user) {
      const foundedUser = await this.prismaService.user.findUnique({
        where: {
          id
        }
      });

      if (!foundedUser) {
        return null;
      }

      const seconds = convertToSecondsUtil(this.configService.get("JWT_EXP"));
      await this.cacheManager.set(id, foundedUser, seconds);
      return foundedUser;
    }

    return user ? new UserResponse(user) : null;
  }

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.findOne(createUserDto.email).catch((err) => {
      this.logger.error(err);
      throw new BadRequestException(errorMessagesEnum.auth.register);
    });

    if (user) {
      throw new ConflictException(
        errorMessagesEnum.auth.emailAlreadyRegistered
      );
    }

    const hashedPassword = this.hashPassword(createUserDto.password);

    try {
      const newUser = await this.prismaService.user.create({
        data: { ...createUserDto, password: hashedPassword }
      });
      return newUser;
    } catch (error) {
      this.logger.error(error);
      throw new Error(errorMessagesEnum.user.create);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto
    });

    return new UserResponse(updatedUser);
  }

  async remove(id: string, user: JwtPayload) {
    if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException();
    }

    await Promise.all([
      this.cacheManager.del(id),
      this.cacheManager.del(user.email)
    ]);

    return await this.prismaService.user.delete({
      where: { id },
      select: { id: true }
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
