import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        token_acceso: string;
        usuario: {
            usuario: string;
            rol: string;
        };
    } | {
        success: boolean;
        message: string;
    }>;
}
