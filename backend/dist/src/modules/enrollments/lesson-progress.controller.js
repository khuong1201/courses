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
exports.LessonProgressController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_progress_service_1 = require("./lesson-progress.service");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let LessonProgressController = class LessonProgressController {
    lessonProgressService;
    constructor(lessonProgressService) {
        this.lessonProgressService = lessonProgressService;
    }
    markLessonCompleted(req, enrollmentId, lessonId) {
        return this.lessonProgressService.markLessonCompleted(enrollmentId, req.user.id, lessonId);
    }
};
exports.LessonProgressController = LessonProgressController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark a lesson as completed' }),
    (0, common_1.Post)(':enrollmentId/lessons/:lessonId/complete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('enrollmentId')),
    __param(2, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LessonProgressController.prototype, "markLessonCompleted", null);
exports.LessonProgressController = LessonProgressController = __decorate([
    (0, swagger_1.ApiTags)('Lesson Progress'),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Controller)('enrollments'),
    __metadata("design:paramtypes", [lesson_progress_service_1.LessonProgressService])
], LessonProgressController);
//# sourceMappingURL=lesson-progress.controller.js.map