import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * Controlador para la autenticación de usuarios.
 * Permite el login y la generación de tokens JWT.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para login de usuario. Devuelve un token JWT si las credenciales son válidas.
   * @param body Objeto con username y password
   */
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const usuario = await this.authService.validateUser(body.username, body.password);
    if (usuario) {
      // Adaptar el objeto para login
      return this.authService.login({ username: usuario.usuario, role: usuario.rol });
    }
    return { success: false, message: 'Credenciales inválidas' };
  }
}
