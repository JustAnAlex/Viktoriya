import { Post } from '@modules/posts/models/posts.model';
import { PostsModule } from '@modules/posts/posts.module';
import { User } from '@modules/users/models/users.model';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './db.sqlite',
      models: [User, Post],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
