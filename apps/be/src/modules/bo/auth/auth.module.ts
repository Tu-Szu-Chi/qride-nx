import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoAuthService } from './auth.service';
import { BoAuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { BoAuthRepository } from './auth.repository';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BoAuthController],
  providers: [BoAuthService, JwtStrategy, BoAuthRepository, RolesGuard],
  exports: [BoAuthService, JwtModule, RolesGuard],
})
export class BoAuthModule {}
