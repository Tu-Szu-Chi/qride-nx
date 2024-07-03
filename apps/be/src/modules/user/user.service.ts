import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupPayload } from '@org/types';
import * as bcrypt from 'bcrypt';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_POOL') private pool: Pool,
  ) {}

  async findOne(phone: string): Promise<User | undefined> {
    const user: QueryResult<User> = await this.pool.query(`
      SELECT * from users
      WHERE phone = ${phone}
      limit 1; 
      `)
      console.log(user.rows)
      // const query = {
      //   text: 'SELECT * FROM users WHERE phone = $1 LIMIT 1',
      //   values: [phone],
      // };
      // const user: QueryResult<User> = await this.pool.query(query);
      return user.rows[0];
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