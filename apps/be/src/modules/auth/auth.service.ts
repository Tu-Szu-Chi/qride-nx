import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class AuthService {
  constructor(
    
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phone: string, password: string): Promise<Partial<User> | undefined> {
    
    const user = await this.userService.findOne(phone);
    return user;
    // if (user && await bcrypt.compare(password, user.password)) {
    //   return omit(user, 'password');
    // }
    return null;
  }

  async login(phone: string, userId: string) {
    const payload = { phone: phone, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async register(username: string, password: string) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //   await this.userService.create(username, hashedPassword, otp);
  //   // 在實際應用中,您需要發送OTP給用戶(例如通過電子郵件或短信)
  //   return { message: 'User registered. Please verify your account with OTP.' };
  // }

  // async verifyOtp(username: string, otp: string) {
  //   const user = await this.userService.findOne(username);
  //   if (user && user.otp === otp) {
  //     user.isVerified = true;
  //     user.otp = null;
  //     await this.userService.save(user);
  //     return { message: 'Account verified successfully.' };
  //   }
  //   return { message: 'Invalid OTP.' };
  // }
}