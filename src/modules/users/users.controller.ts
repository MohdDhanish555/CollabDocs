import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Public } from "src/decorators/public.decorator";
import { ResponseMessage } from "src/decorators/responseMessage.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ResponseMessage("users.CREATE_SUCCESS")
  @UsePipes(ValidationPipe)
  @Post("create")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ResponseMessage("users.FIND_ALL")
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ResponseMessage("users.GET_PROFILE")
  @Get("/profile")
  async profile(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
