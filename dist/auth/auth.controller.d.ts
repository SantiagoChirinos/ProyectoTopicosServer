import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        success: boolean;
        user: {
            username: string;
            role: string;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        user?: undefined;
    }>;
}
