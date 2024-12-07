import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, UniqueConstraintError } from "sequelize";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const payload = {
        username: createUserDto.username,
        password: createUserDto.password,
      };
      return await this.userModel.create(payload);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException("User already exists");
      } else throw error;
    }
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({
      where: { id },
    });
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
