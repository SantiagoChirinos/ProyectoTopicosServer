import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        username: string;
        role: string;
    }>;
    login(user: {
        username: string;
        role: string;
    }): Promise<{
        access_token: string;
        user: {
            username: string;
            role: string;
        };
    }>;
}
