import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../api/dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/posts.model';
import { GetAllUserPostsDto } from '../api/dto/get-all-user-posts.dto';
import { GetPostByIdDto } from '../api/dto/get-post-by-id.dto';
import { GetPostReadingTimeDto } from '../api/dto/get-post-reading-time.dto';
import { getPostReadingTime } from '../helpers/get-post-reading-time';
import { UsersService } from '@modules/users/services/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private userService: UsersService,
  ) {}

  async create(dto: CreatePostDto) {
    const user = await this.userService.getUserById(dto.userId);
    if (!user)
      throw new HttpException(
        `user with id: ${dto.userId} not exists`,
        HttpStatus.BAD_REQUEST,
      );
    const newPost = await this.postRepository.create(dto);
    return newPost;
  }

  async getAllUserPosts({ email, page, limit }: GetAllUserPostsDto) {
    const user = await this.userService.getUserByEmail(email);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);

    let posts;
    const MIN_LIMIT = 10;
    const MIN_PAGE = 1;
    if (!page && !limit) {
      posts = await this.postRepository.findAll({ where: { userId: user.id } });
    } else {
      const offset = (page ?? MIN_PAGE - 1) * (limit ?? MIN_LIMIT);
      posts = await this.postRepository.findAll({
        where: { userId: user.id },
        limit: limit ?? MIN_LIMIT,
        offset,
      });
    }
    return posts;
  }

  async getPostById({ id }: GetPostByIdDto) {
    return await this.postRepository.findByPk(id);
  }

  async getPostReadingTime({ id }: GetPostReadingTimeDto) {
    const post = await this.getPostById({ id });
    if (!post)
      throw new HttpException(
        `post with id: ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    return getPostReadingTime(post.title);
  }
}
