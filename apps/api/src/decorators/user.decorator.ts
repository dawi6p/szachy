import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../Users/users.service';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    user.Role = user.adminPowerId === UserRole.Admin;
    return user;
  },
);