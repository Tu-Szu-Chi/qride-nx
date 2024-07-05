import {
  Controller,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../../decorators/userId.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/info')
  async getInfo(@UserId() userId: string) {
    return this.userService.getUserInfo(userId)
  }
}
