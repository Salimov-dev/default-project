import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { PrismaService } from "src/prisma.service";
import { genSaltSync, hashSync } from "bcrypt";
import { errorMessagesEnum } from "@auth/config";
import { User } from "@prisma/client";
import { UserResponse } from "./responses";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user
      .findMany()
      .then((users) => users.map((user) => new UserResponse(user)));
  }

  async findOne(email: string) {
    const foundedUser = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    return foundedUser ? new UserResponse(foundedUser) : null;
  }

  async findById(id: string) {
    const foundedUser = await this.prismaService.user.findUnique({
      where: {
        id
      }
    });

    return new UserResponse(foundedUser);
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

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
      select: { id: true }
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
