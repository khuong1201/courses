import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { LessonType } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async createLesson(moduleId: string, instructorId: string, data: { title: string, contentType: LessonType, videoUrl?: string, textContent?: string, order: number }) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });
    if (!module) throw new NotFoundException('Module not found');
    if (module.course.instructor_id !== instructorId) {
      throw new ForbiddenException('You can only add lessons to your own modules');
    }

    return this.prisma.lesson.create({
      data: {
        module_id: moduleId,
        title: data.title,
        content_type: data.contentType,
        video_url: data.videoUrl,
        text_content: data.textContent,
        order: data.order,
      },
    });
  }
}
