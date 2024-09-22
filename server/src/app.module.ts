import { Module } from "@nestjs/common";
import { UserModule } from "@user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ErrorService } from "@error/error.service";
import { ErrorModule } from "@error/error.module";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [ErrorService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    UserModule,
    ErrorModule,
    AuthModule
  ]
})
export class AppModule {}
