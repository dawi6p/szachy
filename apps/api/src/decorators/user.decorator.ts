import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../Users/users.service';
import { decodeToken } from 'react-jwt/dist/jwt';

export interface IRequest extends Request {
    session: any;
}


export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    const req = ctx.switchToHttp().getRequest();
    const token = req.session.access_token;
    let use = decodeToken(token);

    user.Role = user.adminPowerId === UserRole.Admin;
    return user;
  },
);