import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../modules/cards/user.interface';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
