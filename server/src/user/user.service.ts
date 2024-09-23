import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { PrismaService } from "src/prisma.service";
import { genSaltSync, hashSync } from "bcrypt";
import { errorMessagesEnum } from "@error/enum/error-messages.enum";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.findOne(createUserDto.email).catch((err) => {
      this.logger.error(err);
      throw new BadRequestException(errorMessagesEnum.auth.register);
    });

    if (user) {
      throw new ConflictException(errorMessagesEnum.auth.registerConflict);
    }

    const hashedPassword = this.hashPassword(createUserDto.password);

    try {
      const newUser = await this.prismaService.user.create({
        data: { ...createUserDto, password: hashedPassword }
      });
      return newUser;
    } catch (error) {
      // TODO заменить на logger, а console.log убрать
      console.error(errorMessagesEnum.user.create, error);
      throw new Error(errorMessagesEnum.user.create);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
