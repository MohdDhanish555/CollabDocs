import {
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import * as bcrypt from "bcrypt";
import { v4 as UUID } from "uuid";
import { Document } from "src/modules/documents/entities/document.entity";
import { Collaborator } from "src/modules/documents/entities/collaborators.entity";
import { Comments } from "src/modules/documents/entities/comments.entity";

@Table({
  underscored: true,
})
export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @Default(UUID)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Unique
  @NotNull
  @Column
  username: string;

  @AllowNull(false)
  @NotNull
  @Column
  password: string;

  @Column
  refreshToken: string;

  @HasMany(() => Document, "authorId")
  documents: Document[];

  @HasMany(() => Collaborator, "userId")
  collaborations: Collaborator[];

  @HasMany(() => Comments, "userId")
  comments: Comments[];

  @BeforeCreate
  static async setPassword(user: User) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }
}
