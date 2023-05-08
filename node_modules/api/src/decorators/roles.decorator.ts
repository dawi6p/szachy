import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../Users/users.service';

export const Roles = (roles: UserRole[]) => SetMetadata('roles', roles);