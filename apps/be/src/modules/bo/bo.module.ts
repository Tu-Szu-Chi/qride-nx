// bo.module.ts
import { Module } from '@nestjs/common';
import { BoController } from './bo.controller';
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
// 导入其他子控制器和服务

@Module({
  controllers: [BoController, AuthController],
  providers: [AuthService, UserService, JwtService, UserRepository],
})
export class BoModule {}