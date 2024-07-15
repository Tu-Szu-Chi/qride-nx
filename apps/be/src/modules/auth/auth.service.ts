import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  OtpTypeEnum,
  RegisterDto,
  ResetPasswordDto,
  User,
  UserSourceType,
  UserType,
  UserVO,
} from '@org/types';

import * as bcrypt from 'bcrypt';
import { isNull, omit } from 'lodash';
import axios from 'axios';
import { OtpJwtPayload } from './otp.service';
import {
  INVALID_PAYLOAD,
  alphaMax50Regex,
  birthdayRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
} from '@org/common';

type AuthSuccessBO = {
  access_token: string;
  user_id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(phone: string, password: string): Promise<AuthSuccessBO> {
    const user = await this.validateUser(phone, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.signToken(phone, user.id),
      user_id: user.id,
    };
  }

  async register(
    payload: RegisterDto,
    token: string
  ): Promise<AuthSuccessBO & { user: UserVO }> {
    // 1. verify token
    const { type, verified, phone }: OtpJwtPayload =
      this.jwtService.verify(token);
    if (
      type != OtpTypeEnum.REGISTER ||
      verified != true ||
      phone != payload.phone
    )
      throw new UnauthorizedException();

    this.validateRegisterPayload(payload);

    const hashedPassword = await this.hashedPassword(payload.password);
    const userVO = await this.userService.create(payload, hashedPassword);
    // 在實際應用中,您需要發送OTP給用戶(例如通過電子郵件或短信)
    return {
      access_token: this.signToken(userVO.phone, userVO.id),
      user_id: userVO.id,
      user: userVO,
    };
  }
  async resetPassword(payload: ResetPasswordDto, token: string) {
    const { type, verified, phone }: OtpJwtPayload =
      this.jwtService.verify(token);
    if (
      type != OtpTypeEnum.RESET_PASSWORD ||
      verified != true ||
      !phoneRegex.test(phone)
    )
      throw new UnauthorizedException();

    const { password, re_password } = payload;
    if (password != re_password || !passwordRegex.test(password))
      throw new BadRequestException('Invalid password');

    const hashedPassword = await this.hashedPassword(payload.password);
    const userEntity = await this.userService.findOne(phone);
    if (isNull(userEntity)) throw new BadRequestException('Not found user');
    await this.userService.updateUser(userEntity.id, {
      password: hashedPassword,
    });
    return true;
  }
  async verifyRecaptcha(recaptchaResponse) {
    const secretKey = 'YOUR_SECRET_KEY';
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

    try {
      const response = await axios.post(verifyUrl, null, {
        params: {
          secret: secretKey,
          response: recaptchaResponse,
        },
      });
      return response.data.success;
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return false;
    }
  }
  private async validateUser(
    phone: string,
    password: string
  ): Promise<Partial<User> | undefined> {
    const user = await this.userService.findOne(phone);
    if (user && (await bcrypt.compare(password, user.password))) {
      return omit(user, 'password');
    }
    return null;
  }
  private validateRegisterPayload(payload: RegisterDto) {
    const {
      phone,
      type,
      password,
      re_password,
      first_name,
      mid_name = '',
      last_name,
      address_city,
      address_state,
      address_detail = '',
      birthday = '',
      source = NaN,
      email = '',
      whatsapp = '',
      facebook = '',
    } = payload;
    const badRequestGenerator = (message: string = '') =>
      new BadRequestException({ bizCode: INVALID_PAYLOAD, message });
    // 1. validate phone format
    if (!phoneRegex.test(phone)) throw badRequestGenerator('Invalid phone');
    if (!Object.values(UserType).includes(type)) throw badRequestGenerator();
    if (!passwordRegex.test(password))
      throw badRequestGenerator('Invalid password');
    if (password != re_password) throw badRequestGenerator();
    if (
      !alphaMax50Regex.test(first_name) ||
      !alphaMax50Regex.test(last_name) ||
      (mid_name != '' && !alphaMax50Regex.test(mid_name))
    )
      throw badRequestGenerator('Invalid name');
    if (
      !alphaMax50Regex.test(address_city) ||
      !alphaMax50Regex.test(address_state) ||
      (address_detail != '' && !alphaMax50Regex.test(address_detail))
    )
      throw badRequestGenerator('Invalid address');
    if (birthday != '' && !birthdayRegex.test(birthday))
      throw badRequestGenerator('Invalid birthday');
    if (
      !Number.isNaN(source) &&
      !Object.values(UserSourceType).includes(source)
    )
      throw badRequestGenerator('Invalid source');
    if (email != '' && !emailRegex.test(email))
      throw badRequestGenerator('Invalid email');
    // whatsapp
    // facebook
  }
  private signToken(phone: string, id: string): string {
    const payload = { phone: phone, sub: id };
    return this.jwtService.sign(payload);
  }
  private async hashedPassword(password: string): Promise<string> {
    const PasswordSalt = 10;
    return await bcrypt.hash(password, PasswordSalt);
  }
}
