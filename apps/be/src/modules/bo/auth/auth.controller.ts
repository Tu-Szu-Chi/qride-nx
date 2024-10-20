import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Headers,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ACCESS_TOKEN,
  CODE_SUCCESS,
  HEADER_PRE_TOKEN,
  HEADER_USER_ID,

} from '@org/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  RegisterDto,
  LoginDto,
  SendOtpDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from '@org/types';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '$/types'

const oneMonth = 30 * 24 * 60 * 60 * 1000;
let isProd = false;
@Controller('bo/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
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
    // this.setToken(res, access_token, user_id, body.remember_me)
    return { access_token, user_id };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(HEADER_USER_ID)
    return true;
  }

  // @Post('register')
  // async register(
  //   @Body() body: RegisterDto,
  //   @Headers(HEADER_PRE_TOKEN) preRegisterToken: string,
  //   @Res({ passthrough: true }) res: Response
  // ) {
  //   const { access_token, user_id, user } = await this.authService.register(
  //     body,
  //     preRegisterToken
  //   );
  //   this.setToken(res, access_token, user_id, false)
  //   return {
  //     bizCode: CODE_SUCCESS,
  //     data: user
  //   };
  // }
  // @Post('reset-password')
  // async resetPassword(
  //   @Body() body: ResetPasswordDto,
  //   @Headers(HEADER_PRE_TOKEN) preResetToken: string,
  //   @Res({ passthrough: true }) res: Response
  // ) {
  //   const result = await this.authService.resetPassword(body, preResetToken);
  //   if (result.data != true) return result;
  //   res.clearCookie(ACCESS_TOKEN);
  //   res.clearCookie(HEADER_USER_ID)

  //   return {
  //     bizCode: CODE_SUCCESS,
  //     data: true
  //   };
  // }


  // @UseGuards(AuthGuard('jwt'))
  // @Post('verify')
  // async verifyToken(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
  //   const { userId, phone } = req.user
  //   const token = this.authService.refreshToken(userId, phone)
  //   this.setToken(res, token, userId, true)
  //   return true;
  // }
  // setToken(res: Response, token, userId, remember: boolean = false) {
  //   if (remember) {
  //     res.cookie(ACCESS_TOKEN, token, {
  //       secure: isProd,
  //       sameSite: 'strict',
  //       maxAge: oneMonth,
  //     });
  //     res.cookie(HEADER_USER_ID, userId, {
  //       secure: isProd,
  //       sameSite:  'strict',
  //       maxAge: oneMonth,
  //     });
  //   } else {
  //     res.cookie(ACCESS_TOKEN, token, {
  //       secure: isProd,
  //     });
  //     res.cookie(HEADER_USER_ID, userId, {
  //       secure: isProd,
  //     });
  //   }
  // }
}