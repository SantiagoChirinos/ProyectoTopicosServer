import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            username: string;
            role: string;
        };
    } | {
        success: boolean;
        message: string;
    }>;
}
