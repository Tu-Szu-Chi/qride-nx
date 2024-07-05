import { Inject, Injectable } from '@nestjs/common';
import { SignupPayload, User, UserVO } from '@org/types';
import { UserRepository } from './user.repository';
import { omit } from 'lodash';

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
    return omit(user, ['is_delete', 'created_at', 'updated_at', 'password'])
  }

  // async findById(id: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  // async create(createUserDto: SignupPayload): Promise<User> {
  //   const { phone, password, email } = createUserDto;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = this.userRepository.create({
  //     phone,
  //     password: hashedPassword,
  //     email,
  //   });
  //   return this.userRepository.save(user);
  // }

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