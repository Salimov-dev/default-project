import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto
      });
      return newUser;
    } catch (error) {
      // TODO вынести ошибки в один общий файл с ошибками
      console.error("Ошибка при создании пользователя:", error);
      throw new Error("Ошибка создания пользователя");
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
