import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { ACCESS_TOKEN, HEADER_USER_ID } from '@org/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignupPayload, LoginPayload } from '@org/types';


const oneDay = 24 * 60 * 60 * 1000;
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginPayload,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, user_id } = await this.authService.login(body.phone, body.password);
    res.cookie(ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: oneDay,
    });
    res.cookie(HEADER_USER_ID, user_id, {
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: oneDay
    })
    return { access_token, user_id };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN);
    return true;
  }

  // @Post('register')
  // async register(@Body() body: SignupPayload) {
  //   return this.authService.register(body.username, body.password);
  // }

  // @Post('verify')
  // async verifyOtp(@Body() body: { username: string; otp: string }) {
  //   return this.authService.verifyOtp(body.username, body.otp);
  // }
}
