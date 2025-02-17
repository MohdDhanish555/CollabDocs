import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comments } from "./entities/comments.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments) private commentsModel: typeof Comments) {}

  async getCommentsByDocumentId(documentId: string) {
    return await this.commentsModel.findAll({
      where: { documentId },
      attributes: ["id", "comment", "createdAt"],
      include: {
        model: User,
        attributes: ["id", "username"],
      },
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
