import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagController } from '../src/featureflag.controller';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

describe('FeatureFlagController', () => {
  let controller: FeatureFlagController;
  let jwtService: JwtService;

  const mockJwtService = {
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureFlagController],
      providers: [
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();
    controller = module.get<FeatureFlagController>(FeatureFlagController);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('debe retornar acceso público si no hay header de autenticación', () => {
    const req = { headers: {} } as Request;
    const result = controller.checkFeatureFlag(req);
    expect(result).toEqual({ feature: 'acceso-publico', enabled: true, role: 'guest' });
  });

  it('debe retornar acceso de administradores si el rol es admin', () => {
    mockJwtService.verify.mockReturnValue({ role: 'admin' });
    const req = { headers: { authorization: 'Bearer token' } } as Request;
    const result = controller.checkFeatureFlag(req);
    expect(result).toEqual({ feature: 'administradores', enabled: true, role: 'admin' });
  });

  it('debe retornar acceso de usuarios si el rol es user', () => {
    mockJwtService.verify.mockReturnValue({ role: 'user' });
    const req = { headers: { authorization: 'Bearer token' } } as Request;
    const result = controller.checkFeatureFlag(req);
    expect(result).toEqual({ feature: 'usuarios', enabled: true, role: 'user' });
  });

  it('debe retornar acceso público si el token es inválido', () => {
    mockJwtService.verify.mockImplementation(() => { throw new Error('Token inválido'); });
    const req = { headers: { authorization: 'Bearer token' } } as Request;
    const result = controller.checkFeatureFlag(req);
    expect(result).toEqual({ feature: 'acceso-publico', enabled: true, role: 'guest' });
  });
});
