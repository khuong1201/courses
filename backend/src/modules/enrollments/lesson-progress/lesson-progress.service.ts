import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class LessonProgressService {
  constructor(private prisma: PrismaService) {}

  async markLessonCompleted(enrollmentId: string, studentId: string, lessonId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    if (enrollment.student_id !== studentId) {
      throw new ForbiddenException('You do not own this enrollment');
    }

    // Upsert lesson progress
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

    // Dummy recalculate progress
    // In production: fetch all lessons count for course, and completed lessons count, then update enrollment.progress_percentage
    return { success: true };
  }
}
