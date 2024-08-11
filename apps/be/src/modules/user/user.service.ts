import { Injectable } from '@nestjs/common';
import { RegisterDto, User, UserEntity, UserUpdateDto, UserVO } from '@org/types';
import { UserRepository } from './user.repository';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findOne(phone: string): Promise<UserEntity> {
      const user = await this.userRepository.findByPhone(phone)
      return user;
  }
  async getUserInfo(userId: string): Promise<UserVO | undefined> {
    const user = await this.userRepository.findById(userId)
    return {
      ...omit(user, ['is_delete', 'created_at', 'updated_at', 'password', 'birthday']),
    }
  }

  // async findById(id: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  async create(createUserDto: RegisterDto, hashedPassword: string): Promise<UserVO> {
    const userEntity = await this.userRepository.create({
     ...omit(createUserDto, ['password', 're_password']),
      password: hashedPassword,
    });
    return {
      ...omit(userEntity, [
        'created_at',
        'updated_at',
        'is_delete',
        'password',
        'birthday'
      ]),
    };
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

  async updateUser(userId: string, updateData: UserUpdateDto): Promise<UserVO> {
    const userEntity = await this.userRepository.update(userId, updateData);
    return {
      ...omit(userEntity, [
        'created_at',
        'updated_at',
        'is_delete',
        'password',
        'birthday'
      ]),
    };
  }
}