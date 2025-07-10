import { SetMetadata } from '@nestjs/common';

export const ROLE_FLAG_KEY = 'roleFlag';

export const RoleFlag = (roles: string[]) => SetMetadata(ROLE_FLAG_KEY, roles);
