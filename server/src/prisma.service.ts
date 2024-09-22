import { Global, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// @Global() // TODO надо ли глобал тут
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
