import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "@user/user.module";
import { myJwtModuleAsyncOptions } from "./config";
import { PrismaService } from "@prisma/prisma.service";
import { STRATEGIES } from "./strategies";
import { GUARDS } from "./guards";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ...STRATEGIES, ...GUARDS],
  imports: [
    PassportModule,
    JwtModule.registerAsync(myJwtModuleAsyncOptions()),
    UserModule
  ]
})
export class AuthModule {}
