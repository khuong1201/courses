import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(studentId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.status !== 'PUBLISHED') {
      throw new NotFoundException('Course not found or not published');
    }

    const existing = await this.prisma.enrollment.findUnique({
      where: {
        student_id_course_id: { student_id: studentId, course_id: courseId },
      },
    });

    if (existing) {
      throw new BadRequestException('Already enrolled in this course');
    }

    return this.prisma.enrollment.create({
      data: {
        student_id: studentId,
        course_id: courseId,
      },
    });
  }

  async getMyEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { student_id: studentId },
      include: {
        course: {
          select: { title: true, cover_image: true, instructor: { select: { profile: true } } },
        },
      },
    });
  }

  // markLessonCompleted removed -> moved to lesson-progress.service.ts
}
