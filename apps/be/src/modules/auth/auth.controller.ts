import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupPayload, LoginPayload } from '@org/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginPayload) {
    const user = await this.authService.validateUser(body.phone, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user.phone, user.id);
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