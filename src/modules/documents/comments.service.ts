import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comments } from "./entities/comments.entity";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments) private commentsModel: typeof Comments) {}

  async getCommentsByDocumentId(documentId: string) {
    return await this.commentsModel.findAll({
      where: { documentId },
    });
  }

  async addComment(documentId: string, comment: string, userId: string) {
    return await this.commentsModel.create({
      comment,
      documentId,
      userId,
    });
  }
}
