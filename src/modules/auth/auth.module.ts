import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { jwtAsyncConfig } from "src/config/jwt.config";
import { RefreshTokenStrategy } from "./strategy/refresh-token.strategy";

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtAsyncConfig)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
