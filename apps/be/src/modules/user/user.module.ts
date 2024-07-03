import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}