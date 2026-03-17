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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let EnrollmentsService = class EnrollmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async enroll(studentId, courseId) {
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course || course.status !== 'PUBLISHED') {
            throw new common_1.NotFoundException('Course not found or not published');
        }
        const existing = await this.prisma.enrollment.findUnique({
            where: {
                student_id_course_id: { student_id: studentId, course_id: courseId },
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('Already enrolled in this course');
        }
        return this.prisma.enrollment.create({
            data: {
                student_id: studentId,
                course_id: courseId,
            },
        });
    }
    async getMyEnrollments(studentId) {
        return this.prisma.enrollment.findMany({
            where: { student_id: studentId },
            include: {
                course: {
                    select: { title: true, cover_image: true, instructor: { select: { profile: true } } },
                },
            },
        });
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map