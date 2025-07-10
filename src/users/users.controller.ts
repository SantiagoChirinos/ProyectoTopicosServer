import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('bulk')
  async insertUsers(@Body() users: User[]) {
    try {
      return await this.usersService.insertMany(users);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
