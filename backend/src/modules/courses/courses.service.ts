import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseStatus } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(instructorId: string, createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        instructor_id: instructorId,
        status: CourseStatus.DRAFT,
      },
    });
  }

  findAllPublished() {
    return this.prisma.course.findMany({
      where: { status: CourseStatus.PUBLISHED },
      include: {
        instructor: {
          select: { profile: { select: { full_name: true, avatar_url: true } } },
        },
      },
    });
  }

  findAllByInstructor(instructorId: string) {
    return this.prisma.course.findMany({
      where: { instructor_id: instructorId },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: { lessons: true },
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, instructorId: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);
    if (course.instructor_id !== instructorId) {
      throw new ForbiddenException('You can only modify your own courses');
    }
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async publish(id: string, instructorId: string) {
    const course = await this.findOne(id);
    if (course.instructor_id !== instructorId) {
      throw new ForbiddenException('You can only publish your own courses');
    }
    return this.prisma.course.update({
      where: { id },
      data: { status: CourseStatus.PUBLISHED },
    });
  }
}
