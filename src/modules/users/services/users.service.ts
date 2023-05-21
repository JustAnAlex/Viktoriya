import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../api/dto/create-user.dto';
import { GetAllUsersDto } from '../api/dto/get-all-users.dto';
import { GetUserRatingDto } from '../api/dto/get-user-rating.dto';
import { User } from '../models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAllUsers({ page, limit }: GetAllUsersDto) {
    let users;
    const MIN_LIMIT = 10;
    const MIN_PAGE = 1;
    if (!page && !limit) {
      users = await this.userRepository.findAll();
    } else {
      const offset = (page ?? MIN_PAGE - 1) * (limit ?? MIN_LIMIT);
      users = await this.userRepository.findAll({
        limit: limit ?? MIN_LIMIT,
        offset,
      });
    }
    return users;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async calculateUserRating({ id }: GetUserRatingDto): Promise<number> {
    const user = await this.getUserById(id);
    if (!user)
      throw new HttpException(
        `user with id: ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    let totalRating = 0;
    for (const post of user.posts) {
      totalRating += post.rating;
    }
    return totalRating / user.posts.length;
  }
}
