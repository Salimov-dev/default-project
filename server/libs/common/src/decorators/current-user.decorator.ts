import { JwtPayload } from "@auth/interface/token.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (
    key: keyof JwtPayload,
    ctx: ExecutionContext
  ): JwtPayload | Partial<JwtPayload> => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  }
);
