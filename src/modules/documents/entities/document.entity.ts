import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as UUID } from "uuid";

import { User } from "src/modules/users/entities/user.entity";
import { Collaborator } from "./collaborators.entity";

@Table({ underscored: true })
export class Document extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @Default(UUID)
  @Column(DataType.UUID)
  id: string;

  @Default("Untitled")
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotNull
  @Column(DataType.UUID)
  authorId: string;

  @BelongsTo(() => User) author: User;

  @HasMany(() => Collaborator, "documentId")
  collaborators: Collaborator[];
}
