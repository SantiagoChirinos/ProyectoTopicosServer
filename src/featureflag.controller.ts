
/**
 * Controlador para verificar el estado de los feature flags según el rol del usuario.
 * Permite determinar si ciertas características están habilitadas para administradores, usuarios o invitados.
 * @module FeatureFlagController
 */
import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('feature-flag')
export class FeatureFlagController {
  /**
   * Constructor del controlador de feature flags.
   * @param jwtService Servicio para verificar y decodificar JWT.
   */
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Verifica el feature flag según el rol extraído del JWT en la cabecera Authorization.
   * - Si no hay token, se asume invitado.
   * - Si el rol es 'admin', retorna acceso solo administradores.
   * - Si el rol es 'user', retorna acceso solo usuarios.
   * - Para otros roles, retorna acceso público.
   * @param req Objeto de la petición HTTP, usado para extraer el header de autorización.
   * @returns Un objeto con el feature habilitado y el rol detectado.
   */
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
