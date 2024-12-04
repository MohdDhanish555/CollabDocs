import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import appConfig from "./app.config";

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  useFactory: async () => ({
    secret: appConfig().accessSecret,
    global: true,
  }),
};
