import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { sequelizeConfig } from "./config/sequelize.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync(sequelizeConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
