import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../modules/users/user.interface';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
