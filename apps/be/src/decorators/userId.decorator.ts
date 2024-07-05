import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HEADER_USER_ID } from '@org/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers[HEADER_USER_ID];
    if (!userId) {
      throw new UnauthorizedException('User ID not provided in headers');
    }
    return userId;
  },
);