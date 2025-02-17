import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Document } from "./entities/document.entity";
import { Op } from "sequelize";
import { Collaborator } from "./entities/collaborators.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class DocumentsService {
  constructor(@InjectModel(Document) private documentModel: typeof Document) {}

  async findAllByUser(userId: string) {
    const documents = await this.documentModel.findAll({
      where: {
        [Op.or]: [
          { authorId: userId },
          {
            "$collaborators.user_id$": userId,
          },
        ],
      },
      include: [
        {
          model: Collaborator,
          required: false,
          attributes: ["accessLevel"],
        },
      ],
    });
    return documents;
  }

  async create(userId: string) {
    return await this.documentModel.create({
      authorId: userId,
    });
  }

  async getDocumentById(id: string) {
    return await this.documentModel.findOne({
      where: { id },
    });
  }

  async updateDocument(id: string, title: string) {
    return await this.documentModel.update({ title }, { where: { id } });
  }
}
