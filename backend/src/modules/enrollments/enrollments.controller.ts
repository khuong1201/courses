import { Controller, Get, Post, Param, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { Auth } from '../../common/decorators/auth.decorator';
import { EnrollmentEntity } from './entities/enrollment.entity';

@ApiTags('🎓 Student Enrollments')
@ApiBearerAuth()
@Auth()
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @ApiOperation({
    summary: 'Enroll in a published course',
    description: 'The authenticated user enrolls in a course. The course must be in PUBLISHED status.',
  })
  @ApiParam({ name: 'courseId', description: 'UUID of the course to enroll in' })
  @ApiResponse({ status: 201, description: 'Enrollment created successfully', type: EnrollmentEntity })
  @ApiBadRequestResponse({ description: 'Invalid courseId format' })
  @ApiNotFoundResponse({ description: 'Course not found or not published' })
  @ApiConflictResponse({ description: 'Already enrolled in this course' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Post(':courseId')
  enroll(@Request() req: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.enroll(req.user.id, courseId);
  }

  @ApiOperation({
    summary: 'Get my enrolled courses (My Learning)',
    description: 'Returns all courses the authenticated user is currently enrolled in, including progress data.',
  })
  @ApiResponse({ status: 200, description: 'List of enrollments with course details', type: [EnrollmentEntity] })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Get('my-learning')
  getMyEnrollments(@Request() req: any) {
    return this.enrollmentsService.getMyEnrollments(req.user.id);
  }
}
