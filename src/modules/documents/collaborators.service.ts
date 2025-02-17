import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collaborator } from "./entities/collaborators.entity";
import { AddCollaboratorsDto } from "./dto/add-collaborators.dto";

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectModel(Collaborator) private collaboratorModel: typeof Collaborator
  ) {}

  async addCollaborator(id: string, addDto: AddCollaboratorsDto) {
    const payload = addDto.collaborators.map((collaborator) => ({
      documentId: id,
      userId: collaborator,
      accessLevel: addDto.accessLevel,
    }));

    return await this.collaboratorModel.bulkCreate(payload, {
      ignoreDuplicates: true,
    });
  }
}
