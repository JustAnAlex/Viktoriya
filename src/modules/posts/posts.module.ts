import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '@modules/auth/auth.module';
import { User } from '../users/models/users.model';
import { PostsController } from './api/posts.controller';
import { Post } from './models/posts.model';
import { PostsService } from './services/posts.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Post]), UsersModule, AuthModule],
})
export class PostsModule {}
