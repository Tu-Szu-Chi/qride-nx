import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
  //   const user = await this.userService.findById(payload.sub);
  // if (!user) {
  //   throw new UnauthorizedException('User no longer exists');
  // }
  // if (user.isBanned) {
  //   throw new UnauthorizedException('User is banned');
  // }
    return { userId: payload.sub, phone: payload.phone };
  }
}