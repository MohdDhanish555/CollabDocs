import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { LoginDto } from "./dto/login.dto";
import { UsersService } from "../users/users.service";
import appConfig from "src/config/app.config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);

    if (!(await bcrypt.compare(loginDto.password, user?.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, username: user.username };

    const { accessToken, refreshToken } = await this.getToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getToken(payload: { sub: string; username: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: appConfig().accessSecret,
      expiresIn: "360s",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: appConfig().refreshSecret,
      expiresIn: "1d",
    });

    this.usersService.update(payload.sub, {
      refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
