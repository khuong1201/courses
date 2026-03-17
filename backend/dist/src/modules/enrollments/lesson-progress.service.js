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
exports.LessonProgressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LessonProgressService = class LessonProgressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async markLessonCompleted(enrollmentId, studentId, lessonId) {
        const enrollment = await this.prisma.enrollment.findUnique({ where: { id: enrollmentId } });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        if (enrollment.student_id !== studentId) {
            throw new common_1.ForbiddenException('You do not own this enrollment');
        }
        await this.prisma.lessonProgress.upsert({
            where: { enrollment_id_lesson_id: { enrollment_id: enrollmentId, lesson_id: lessonId } },
            update: { is_completed: true, completed_at: new Date() },
            create: {
                enrollment_id: enrollmentId,
                lesson_id: lessonId,
                is_completed: true,
                completed_at: new Date(),
            },
        });
        return { success: true };
    }
};
exports.LessonProgressService = LessonProgressService;
exports.LessonProgressService = LessonProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonProgressService);
//# sourceMappingURL=lesson-progress.service.js.map