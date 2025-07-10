import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../src/users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser = { username: 'test', password: '123', role: 'user' };
  const mockUsersService = {
    findByUsername: jest.fn().mockResolvedValue(mockUser),
  };
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería retornar el token JWT en un login válido', async () => {
    const result = await controller.login({ username: 'test', password: '123' });
    if ('token_acceso' in result) {
      expect(result.token_acceso).toBe('mocked-jwt-token');
      expect(result.usuario).toEqual({ usuario: 'test', rol: 'user' });
    } else {
      throw new Error('Se esperaba token_acceso en el resultado');
    }
  });

  it('debería retornar error en login inválido', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);
    const result = await controller.login({ username: 'wrong', password: 'wrong' });
    if ('success' in result) {
      expect(result.success).toBe(false);
      expect(result.message).toBe('Credenciales inválidas');
    } else {
      throw new Error('Se esperaba respuesta de error');
    }
  });
});
