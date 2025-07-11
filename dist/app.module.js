"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const data_controller_1 = require("./data.controller");
const featureflag_controller_1 = require("./featureflag.controller");
const featureflag_coleccion_controller_1 = require("./featureflag-coleccion.controller");
const mongoose_1 = require("@nestjs/mongoose");
const songs_module_1 = require("./songs/songs.module");
const users_module_1 = require("./users/users.module");
const role_flag_guard_1 = require("./feature-flags/role-flag.guard");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./auth/constants");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            songs_module_1.SongsModule,
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/proyecto-topicos'),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [data_controller_1.DataController, featureflag_controller_1.FeatureFlagController, featureflag_coleccion_controller_1.FeatureFlagColeccionController],
        providers: [
            core_1.Reflector,
            {
                provide: core_1.APP_GUARD,
                useClass: role_flag_guard_1.RoleFlagGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map