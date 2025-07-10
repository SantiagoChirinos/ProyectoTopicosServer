import { JwtService } from '@nestjs/jwt';
export declare class FeatureFlagController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    checkFeatureFlag(req: any): {
        feature: string;
        enabled: boolean;
        role: any;
    };
}
