import {
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  Default,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import * as bcrypt from "bcrypt";
import { v4 as UUID } from "uuid";

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

  @BeforeCreate
  static async setPassword(user: User) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }
}
