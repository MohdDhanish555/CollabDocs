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

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

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
}
