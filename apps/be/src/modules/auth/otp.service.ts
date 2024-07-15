import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpTypeEnum } from '@org/types';

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
  constructor(private jwtService: JwtService) {}
  async generateOtp(phone: string, type: OtpTypeEnum): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // !if reset-password, make sure the phone exist in DB
    // await this.otpModel.create({ phoneNumber, otp, type });
    // 在這裡實現發送 OTP 到用戶手機的邏輯
    return otp;
  }

  async verifyOtp(
    phone: string,
    otp: string,
    type: OtpTypeEnum
  ): Promise<string> {
    // const otpRecord = await this.otpModel.findOne({ phoneNumber, otp }).exec();
    // if (otpRecord) {
    //   await this.otpModel.deleteOne({ phoneNumber, otp }).exec();
    //   return true;
    // }
    // return false;
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
