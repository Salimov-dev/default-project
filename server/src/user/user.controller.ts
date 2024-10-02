import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CurrentUser } from "@common/decorators";
import { JwtPayload } from "@auth/interface";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("find-by-email/:email")
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("find-by-id/:id")
  findById(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(
    @Param("id", ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload
  ) {
    return this.userService.remove(id, user);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  // @Get()
  // me(@CurrentUser() user: JwtPayload) {
  //   return user;
  // }
}
