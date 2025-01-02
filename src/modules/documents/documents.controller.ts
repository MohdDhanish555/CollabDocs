import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { DocumentsService } from "./documents.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ResponseMessage } from "src/decorators/responseMessage.decorator";
import { CommentsService } from "./comments.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("documents")
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly commentsService: CommentsService
  ) {}

  @ResponseMessage("docs.FIND_ALL_BY_USER")
  @Get()
  async findAllByUser(@Req() req: any) {
    return this.documentsService.findAllByUser(req.user.userId);
  }

  @ResponseMessage("docs.CREATE_SUCCESS")
  @UsePipes(ValidationPipe)
  @Post("create")
  async create(@Req() req: any) {
    return this.documentsService.create(req.user.userId);
  }

  @ResponseMessage("docs.GET_COMMENTS_SUCCESS")
  @Get(":id/comments")
  async getCommentsByDocumentId(@Req() req: any) {
    return await this.commentsService.getCommentsByDocumentId(req.params.id);
  }
}
