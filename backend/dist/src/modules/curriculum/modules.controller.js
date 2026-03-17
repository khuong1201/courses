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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const modules_service_1 = require("./modules.service");
const client_1 = require("@prisma/client");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const create_module_dto_1 = require("./dto/create-module.dto");
const course_module_entity_1 = require("./entities/course-module.entity");
let ModulesController = class ModulesController {
    modulesService;
    constructor(modulesService) {
        this.modulesService = modulesService;
    }
    createModule(req, courseId, createModuleDto) {
        return this.modulesService.createModule(courseId, req.user.id, createModuleDto.title, createModuleDto.order);
    }
    updateModule(req, moduleId, title) {
        return this.modulesService.updateModule(moduleId, req.user.id, title);
    }
    deleteModule(req, moduleId) {
        return this.modulesService.deleteModule(moduleId, req.user.id);
    }
};
exports.ModulesController = ModulesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new module in a course' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: course_module_entity_1.CourseModuleEntity }),
    (0, common_1.Post)('courses/:courseId/modules'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "createModule", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a module title' }),
    (0, common_1.Patch)('modules/:moduleId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('moduleId')),
    __param(2, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "updateModule", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a module and its lessons' }),
    (0, common_1.Delete)('modules/:moduleId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "deleteModule", null);
exports.ModulesController = ModulesController = __decorate([
    (0, swagger_1.ApiTags)('Curriculum Modules'),
    (0, auth_decorator_1.Auth)(client_1.Role.INSTRUCTOR, client_1.Role.ADMIN),
    (0, common_1.Controller)('curriculum'),
    __metadata("design:paramtypes", [modules_service_1.ModulesService])
], ModulesController);
//# sourceMappingURL=modules.controller.js.map