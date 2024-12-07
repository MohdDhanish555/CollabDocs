import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (!user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
