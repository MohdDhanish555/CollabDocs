import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { RequirePermission } from "src/decorators/permission.decorator";
import { Permissions } from "src/enums/permissions.enum";
import { PermissionsGuard } from "./guards/permissions.guard";
import { CollaboratorsService } from "./collaborators.service";
import { AddCollaboratorsDto } from "./dto/add-collaborators.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("documents")
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly commentsService: CommentsService,
    private readonly collaboratorService: CollaboratorsService
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

  @ResponseMessage("docs.GET_DOCUMENT_BY_ID")
  @RequirePermission(Permissions.READ)
  @Get(":id")
  async getDocumentById(@Param("id") id: string) {
    return await this.documentsService.getDocumentById(id);
  }

  @ResponseMessage("docs.GET_COMMENTS_SUCCESS")
  @Get(":id/comments")
  async getCommentsByDocumentId(@Req() req: any) {
    return await this.commentsService.getCommentsByDocumentId(req.params.id);
  }

  @ResponseMessage("docs.ADD_COLLABORATOR")
  @UsePipes(ValidationPipe)
  @Post(":id/collaborators")
  async addCollaborator(
    @Param("id") id: string,
    @Body() addCollaboratorsDto: AddCollaboratorsDto
  ) {
    return await this.collaboratorService.addCollaborator(
      id,
      addCollaboratorsDto
    );
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string, @Body() updateUserDto: any) {
    await this.documentsService.updateDocument(id, updateUserDto.title);
  }
}
