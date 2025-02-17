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

@Table({
  underscored: true,
})
export class Comments extends Model {
  @PrimaryKey
  @Default(UUID)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.TEXT)
  comment: string;

  @ForeignKey(() => Document)
  @AllowNull(false)
  @Column(DataType.UUID)
  documentId: string;

  @BelongsTo(() => Document)
  document: Document;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
