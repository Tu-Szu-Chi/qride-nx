import { Controller, UseGuards, Get, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../../decorators/userId.decorator';
import { UserService } from './user.service';
import { UserUpdateDto } from '@org/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/info')
  async getInfo(@UserId() userId: string) {
    return this.userService.getUserInfo(userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('/info')
  async updateInfo(@UserId() userId: string, @Body() payload: UserUpdateDto) {
    return this.userService.updateUser(userId, payload);
  }
}
