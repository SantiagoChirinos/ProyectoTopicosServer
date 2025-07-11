import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

/**
 * Servicio de autenticación. Valida usuarios y genera tokens JWT.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales de un usuario.
   * @param username Nombre de usuario
   * @param password Contraseña
   * @returns Objeto usuario si es válido, null si no
   */
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      // No uses password plano en producción
      return { usuario: user.username, rol: user.role };
    }
    return null;
  }

  /**
   * Genera un token JWT para el usuario autenticado.
   * @param user Objeto con username y role
   * @returns Objeto con token y datos del usuario
   */
  async login(user: { username: string; role: string }) {
    const payload = { username: user.username, role: user.role };
    return {
      token_acceso: this.jwtService.sign(payload),
      usuario: { usuario: user.username, rol: user.role },
    };
  }
}
