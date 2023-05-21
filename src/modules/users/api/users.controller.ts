import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { GetUserRatingDto } from './dto/get-user-rating.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('getAllUsers')
  getAllUserPosts(@Body() dto: GetAllUsersDto) {
    return this.usersService.getAllUsers(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getUserRating')
  getUserRating(@Body() dto: GetUserRatingDto) {
    return this.usersService.calculateUserRating(dto);
  }
}
