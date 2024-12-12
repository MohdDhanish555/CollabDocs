import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Document } from "./entities/document.entity";

@Injectable()
export class DocumentsService {
  constructor(@InjectModel(Document) private documentModel: typeof Document) {}

  async findAllByUser(userId: string) {
    const documents = await this.documentModel.findAll({
      where: { authorId: userId },
    });
    return documents;
  }

  async create(userId: string) {
    return await this.documentModel.create({
      authorId: userId,
    });
  }
}
