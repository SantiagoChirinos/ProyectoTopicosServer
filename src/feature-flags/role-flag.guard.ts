import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleFlagGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roleFlag', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('No hay token proporcionado');

    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = this.jwtService.verify(token);
      if (requiredRoles.includes(payload.role)) {
        return true;
      }
      throw new ForbiddenException('No tienes permisos para acceder a esta funcionalidad');
    } catch (e) {
      throw new ForbiddenException('Token inválido o expirado');
    }
  }
}
