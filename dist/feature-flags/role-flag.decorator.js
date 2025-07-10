"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleFlag = exports.ROLE_FLAG_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLE_FLAG_KEY = 'roleFlag';
const RoleFlag = (roles) => (0, common_1.SetMetadata)(exports.ROLE_FLAG_KEY, roles);
exports.RoleFlag = RoleFlag;
//# sourceMappingURL=role-flag.decorator.js.map