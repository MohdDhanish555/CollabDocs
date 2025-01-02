import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as UUID } from "uuid";
import { User } from "src/modules/users/entities/user.entity";
import { Collaborator } from "./collaborators.entity";
import { Comments } from "./comments.entity";

@Table({ underscored: true })
export class Document extends Model {
  @PrimaryKey
  @AllowNull(false)
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
  @Column(DataType.UUID)
  authorId: string;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Collaborator, "documentId")
  collaborators: Collaborator[];

  @HasMany(() => Comments, "documentId")
  comments: Comments[];
}
