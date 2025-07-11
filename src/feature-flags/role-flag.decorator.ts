import { SetMetadata } from '@nestjs/common';

export const ROLE_FLAG_KEY = 'roleFlag';

/**
 * Decorador para definir los roles permitidos en un endpoint usando programación orientada a aspectos (AOP).
 * @param roles Arreglo de roles permitidos
 * @returns Decorador de metadata para NestJS
 */
export const RoleFlag = (roles: string[]) => SetMetadata(ROLE_FLAG_KEY, roles);
