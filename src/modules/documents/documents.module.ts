import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { Document } from "./entities/document.entity";
import { Collaborator } from "./entities/collaborators.entity";

@Module({
  imports: [SequelizeModule.forFeature([Document, Collaborator])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
