import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      // No uses password plano en producción
      return { username: user.username, role: user.role };
    }
    return null;
  }

  async login(user: { username: string; role: string }) {
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
