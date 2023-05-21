import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetAllUserPostsDto } from './dto/get-all-user-posts.dto';
import { GetPostByIdDto } from './dto/get-post-by-id.dto';
import { GetPostReadingTimeDto } from './dto/get-post-reading-time.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getAllPosts')
  getAllUserPosts(@Body() dto: GetAllUserPostsDto) {
    return this.postService.getAllUserPosts(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getPostById')
  getPostById(@Body() dto: GetPostByIdDto) {
    return this.postService.getPostById(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getPostReadingTime')
  getPostReadingTime(@Body() dto: GetPostReadingTimeDto): Promise<number> {
    return this.postService.getPostReadingTime(dto);
  }
}
