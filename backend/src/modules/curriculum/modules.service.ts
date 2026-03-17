import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async createModule(courseId: string, instructorId: string, title: string, order: number) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructor_id !== instructorId) {
      throw new ForbiddenException('You can only add modules to your own courses');
    }

    return this.prisma.courseModule.create({
      data: {
        course_id: courseId,
        title,
        order,
      },
    });
  }

  private async verifyModuleOwnership(moduleId: string, instructorId: string) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });
    if (!module) throw new NotFoundException('Module not found');
    if (module.course.instructor_id !== instructorId) {
      throw new ForbiddenException('You do not own this module');
    }
  }

  async updateModule(moduleId: string, instructorId: string, title: string) {
    await this.verifyModuleOwnership(moduleId, instructorId);
    return this.prisma.courseModule.update({
      where: { id: moduleId },
      data: { title },
    });
  }

  async deleteModule(moduleId: string, instructorId: string) {
    await this.verifyModuleOwnership(moduleId, instructorId);
    return this.prisma.courseModule.delete({
      where: { id: moduleId },
    });
  }
}
