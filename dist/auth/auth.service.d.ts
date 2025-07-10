import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        usuario: string;
        rol: string;
    }>;
    login(user: {
        username: string;
        role: string;
    }): Promise<{
        token_acceso: string;
        usuario: {
            usuario: string;
            rol: string;
        };
    }>;
}
