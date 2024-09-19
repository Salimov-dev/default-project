import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ErrorService } from './error/error.service';
import { ErrorModule } from './error/error.module';

@Module({
  controllers: [],
  providers: [ErrorService],
  imports: [
    // TODO убедиться, что prod и dev версии env работают
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    UserModule,
    ErrorModule
  ]
})
export class AppModule {}
