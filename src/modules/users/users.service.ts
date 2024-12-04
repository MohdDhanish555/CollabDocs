import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({
      where: {
        username: {
          [Op.iLike]: username.toLowerCase(),
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.update(updateUserDto, {
      where: {
        id,
      },
    });

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
