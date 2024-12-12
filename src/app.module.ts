import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { sequelizeConfig } from "./config/sequelize.config";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DocumentsModule } from './modules/documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync(sequelizeConfig),
    UsersModule,
    AuthModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
