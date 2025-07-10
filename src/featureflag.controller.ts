import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('feature-flag')
export class FeatureFlagController {
  constructor(private readonly jwtService: JwtService) {}

  @Get()
  checkFeatureFlag(@Req() req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return { feature: 'acceso-publico', enabled: true, role: 'guest' };
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      const payload = this.jwtService.verify(token);
      if (payload.role === 'admin') {
        return { feature: 'administradores', enabled: true, role: 'admin' };
      }
      if (payload.role === 'user') {
        return { feature: 'usuarios', enabled: true, role: 'user' };
      }
      return { feature: 'acceso-publico', enabled: true, role: payload.role };
    } catch (e) {
      return { feature: 'acceso-publico', enabled: true, role: 'guest' };
    }
  }
}
