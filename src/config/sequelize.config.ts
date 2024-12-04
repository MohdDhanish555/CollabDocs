import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from "@nestjs/sequelize";
import { Dialect } from "sequelize";

export const sequelizeConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService
  ): Promise<SequelizeModuleOptions> => ({
    dialect: configService.get<string>("DB_DIALECT") as Dialect,
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_NAME"),
    synchronize: true,
    autoLoadModels: true,
    sync: {
      alter: true,
    },
  }),
  inject: [ConfigService],
};
