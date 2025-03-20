import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ResponseMessage } from "src/decorators/responseMessage.decorator";
import { RefreshTokenGuard } from "./guard/refresh-token.guard";
import { User } from "../users/entities/user.entity";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage("auth.LOGIN_SUCCESS")
  @UsePipes(ValidationPipe)
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ResponseMessage("auth.LOGOUT_SUCCESS")
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req: any) {
    return await this.authService.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  async refreshToken(@Req() req: any) {
    return await this.authService.refreshToken(
      req.user.userId,
      req.user.refreshToken
    );
  }
}
