import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { Document } from "./entities/document.entity";
import { Collaborator } from "./entities/collaborators.entity";
import { CommentsService } from "./comments.service";
import { Comments } from "./entities/comments.entity";

@Module({
  imports: [SequelizeModule.forFeature([Document, Collaborator, Comments])],
  controllers: [DocumentsController],
  providers: [DocumentsService, CommentsService],
  exports: [CommentsService],
})
export class DocumentsModule {}
