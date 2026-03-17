import { Controller, Get, Post, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { Auth } from '../../common/decorators/auth.decorator';
import { EnrollmentEntity } from './entities/enrollment.entity';

@ApiTags('Student Enrollments')
@Auth()
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // Any authenticated user can enroll (Standard student behavior)
  @ApiOperation({ summary: 'Enroll in a published course' })
  @ApiResponse({ status: 201, type: EnrollmentEntity })
  @Post(':courseId')
  enroll(@Request() req: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.enroll(req.user.id, courseId);
  }

  @ApiOperation({ summary: 'Get all my enrolled courses' })
  @Get('my-learning')
  getMyEnrollments(@Request() req: any) {
    return this.enrollmentsService.getMyEnrollments(req.user.id);
  }

  // markLessonCompleted removed -> moved to lesson-progress.controller.ts
}
