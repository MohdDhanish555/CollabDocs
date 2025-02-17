import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUUID,
} from "class-validator";
import { Permissions } from "src/enums/permissions.enum";

export class AddCollaboratorsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  collaborators: string[];

  @IsEnum(Permissions)
  accessLevel: string;
}
