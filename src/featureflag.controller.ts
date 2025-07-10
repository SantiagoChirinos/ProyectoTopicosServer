import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('feature-flag')
export class FeatureFlagController {
  constructor(private readonly jwtService: JwtService) {}

  @Get()
  checkFeatureFlag(@Req() req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return { feature: 'acceso-publico', enabled: true, role: 'invitado' };
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      const payload = this.jwtService.verify(token);
      if (payload.role === 'admin') {
        return { feature: 'solo administradores', enabled: true, role: 'administrador' };
      }
      if (payload.role === 'user') {
        return { feature: 'solo usuarios', enabled: true, role: 'usuario' };
      }
      return { feature: 'acceso-público', enabled: true, role: payload.role };
    } catch (e) {
      return { feature: 'acceso-público', enabled: true, role: 'invitado' };
    }
  }
}
