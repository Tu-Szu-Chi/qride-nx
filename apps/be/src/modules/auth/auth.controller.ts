import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Headers,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ACCESS_TOKEN,
  CAPTCHA_KEY,
  HEADER_PRE_TOKEN,
  HEADER_USER_ID,
} from '@org/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto, LoginDto, SendOtpDto, VerifyOtpDto } from '@org/types';
import { OtpService } from './otp.service';
import { OtpTypeEnum } from '@org/types';

const oneDay = 24 * 60 * 60 * 1000;
let isProd = false;
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: OtpService
  ) {
    isProd = process.env.NODE_ENV !== 'development';
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, user_id } = await this.authService.login(
      body.phone,
      body.password
    );
    res.cookie(ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: oneDay,
    });
    res.cookie(HEADER_USER_ID, user_id, {
      secure: isProd,
      sameSite: 'strict',
      maxAge: oneDay,
    });
    return { access_token, user_id };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN);
    return true;
  }

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Headers(HEADER_PRE_TOKEN) preRegisterToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, user_id, user } = await this.authService.register(body, preRegisterToken);
    res.cookie(ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: oneDay,
    });
    res.cookie(HEADER_USER_ID, user_id, {
      secure: isProd,
      sameSite: 'strict',
      maxAge: oneDay,
    });
    return user
  }
  // @Post('reset-password')
  // async resetPassword() {

  // }
  @Post('otp/send')
  async sendOtp(@Body() body: SendOtpDto) {
    const { phone, type } = body;
    if (!Object.values(OtpTypeEnum).includes(type))
      throw new BadRequestException();

    // ! Verify the phone format
    const recaptcha = body[CAPTCHA_KEY];
    if (await this.authService.verifyRecaptcha(recaptcha)) {
      return this.otpService
        .generateOtp(phone, type)
        .then(() => true)
        .catch(() => new InternalServerErrorException());
    }
    throw new UnauthorizedException();
  }

  @Post('otp/verify')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    const { phone, otp, type } = body;
    return this.otpService
      .verifyOtp(phone, otp, type)
      .then((token) => ({ token }))
      .catch(() => new BadRequestException());
  }
}
