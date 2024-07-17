import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpTypeEnum } from '@org/types';
import { OtpRepository } from './otp.repository';
import { isEmpty } from 'lodash';
import { UserService } from '../user/user.service';

const OTP_TTL: Record<OtpTypeEnum, string> = {
  [OtpTypeEnum.REGISTER]: '30m',
  [OtpTypeEnum.RESET_PASSWORD]: '8m',
};
export type OtpJwtPayload = {
  phone: string;
  verified: boolean;
  type: OtpTypeEnum
}

@Injectable()
export class OtpService {
  constructor(private jwtService: JwtService,
    private readonly otpRepository: OtpRepository,
    private readonly userService: UserService
  ) {}
  async generateOtp(phone: string, type: OtpTypeEnum): Promise<string> {
    if (isEmpty(phone)) throw new InternalServerErrorException('Invalid phone');
    if (OtpTypeEnum.RESET_PASSWORD == type) {
        const user = await this.userService.findOne(phone);
        if (isEmpty(user)) throw new InternalServerErrorException('Invalid phone');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.otpRepository.create({ phone, type, otp })
    // 在這裡實現發送 OTP 到用戶手機的邏輯
    return otp;
  }

  async verifyOtp(
    phone: string,
    otp: string,
    type: OtpTypeEnum
  ): Promise<string> {
    const otpEntity = await this.otpRepository.findOne(phone, otp, type);
    if (isEmpty(otpEntity)) {
      throw new BadRequestException("Invalid code")
    }
    this.otpRepository.verify(phone)

    return this.jwtService.sign(
      { phone, verified: true, type },
      { expiresIn: OTP_TTL[type] }
    );
  }
  async verifyToken(
    token: string,
    type: OtpTypeEnum
  ): Promise<boolean> {
    try {
      const payload: OtpJwtPayload = this.jwtService.verify(token);
      if (payload.verified && payload.type == type) {
        return true;
      }
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
    return false;
  }
}
