"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleFlagGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
let RoleFlagGuard = class RoleFlagGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get('roleFlag', context.getHandler());
        if (!requiredRoles)
            return true;
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader)
            throw new common_1.ForbiddenException('No hay token proporcionado');
        const token = authHeader.replace('Bearer ', '');
        try {
            const payload = this.jwtService.verify(token);
            if (requiredRoles.includes(payload.role)) {
                return true;
            }
            throw new common_1.ForbiddenException('No tienes permisos para acceder a esta funcionalidad');
        }
        catch (e) {
            throw new common_1.ForbiddenException('Token inválido o expirado');
        }
    }
};
exports.RoleFlagGuard = RoleFlagGuard;
exports.RoleFlagGuard = RoleFlagGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_1.JwtService])
], RoleFlagGuard);
//# sourceMappingURL=role-flag.guard.js.map