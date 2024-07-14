import { Injectable } from '@nestjs/common';
import { RegisterDto, User, UserVO } from '@org/types';
import { UserRepository } from './user.repository';
import { omit } from 'lodash';
import { fromDate } from '@org/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findOne(phone: string): Promise<User | undefined> {
      const user = await this.userRepository.findByPhone(phone)
      return user;
  }
  async getUserInfo(userId: string): Promise<UserVO | undefined> {
    const user = await this.userRepository.findById(userId)
    return {
      ...omit(user, ['is_delete', 'created_at', 'updated_at', 'password', 'birthday']),
      birthday: user.birthday ? fromDate(user.birthday) : null
    }
  }

  // async findById(id: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  async create(createUserDto: RegisterDto, hashedPassword: string): Promise<UserVO> {
    return await this.userRepository.create({
     ...omit(createUserDto, ['password', 're_password']),
      password: hashedPassword,
    });
  }

//   async setOtp(userId: number, otp: string): Promise<void> {
//     await this.userRepository.update(userId, { otp });
//   }

//   async verifyOtp(userId: number, otp: string): Promise<boolean> {
//     const user = await this.findById(userId);
//     if (user && user.otp === otp) {
//       await this.userRepository.update(userId, { isVerified: true, otp: null });
//       return true;
//     }
//     return false;
//   }

  // async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
  //   await this.userRepository.update(userId, updateData);
  //   return this.findById(userId);
  // }
}