import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
