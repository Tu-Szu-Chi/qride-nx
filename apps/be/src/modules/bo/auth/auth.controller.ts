import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
  HttpCode,
  Logger,
  Get,
} from '@nestjs/common';
import { BoAuthService } from './auth.service';
import {
  BoLoginDto,
  BoAuthResponse,
  CreateBoUserDto,
  BoRole,
} from '@org/types';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Request } from 'express';

@Controller()
export class BoAuthController {
  private readonly logger = new Logger(BoAuthController.name);

  constructor(private boAuthService: BoAuthService) {
    this.logger.log('BoAuthController initialized');
  }

  @Post('login')
  async login(@Body() loginDto: BoLoginDto): Promise<BoAuthResponse> {
    this.logger.log(`Login attempt received for user: ${loginDto.username}`);
    try {
      const user = await this.boAuthService.validateUser(
        loginDto.username,
        loginDto.password
      );
      if (!user) {
        this.logger.warn(`Login failed for user: ${loginDto.username}`);
        throw new UnauthorizedException();
      }
      const result = await this.boAuthService.login(user);
      this.logger.log(`Login successful for user: ${loginDto.username}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Login error for user ${loginDto.username}:`,
        error.stack
      );
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(BoRole.ADMIN)
  @Post('create-user')
  async createUser(@Body() createUserDto: CreateBoUserDto) {
    return this.boAuthService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(204)
  async logout(@Req() req: Request) {
    const userId = req.user['userId'];
    await this.boAuthService.logout(userId);
  }

  @Post('refresh')
  async refreshToken(
    @Body('refresh_token') refreshToken: string
  ): Promise<BoAuthResponse> {
    return this.boAuthService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async checkAuth() {
    return { authenticated: true };
  }
}
