import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as UUID } from "uuid";

import { Document } from "./document.entity";
import { User } from "src/modules/users/entities/user.entity";

@Table({ underscored: true })
export class Collaborator extends Model {
  @PrimaryKey
  @AllowNull(false)
  @NotNull
  @Default(UUID)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @ForeignKey(() => Document)
  @Column(DataType.UUID)
  documentId: string;

  @AllowNull(false)
  @NotNull
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.ENUM("read", "write"))
  accessLevel: "read" | "write";

  @BelongsTo(() => Document) document: Document;

  @BelongsTo(() => User) user: User;
}
