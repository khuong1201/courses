import { Controller, Post, Param, Request, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { LessonProgressService } from './lesson-progress.service';
import { Auth } from '../../../common/decorators/auth.decorator';

class LessonProgressResponseDto {
  success: boolean;
}

@ApiTags('📊 Lesson Progress')
@ApiBearerAuth()
@Auth()
@Controller('enrollments')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {

  }

  @ApiOperation({
    summary: 'Mark a lesson as completed',
    description:
      'Records the lesson as completed for the enrolled student. The student must be the owner of the enrollment. Progress percentage is recalculated automatically.',
  })
  @ApiParam({ name: 'enrollmentId', description: 'UUID of the student enrollment record' })
  @ApiParam({ name: 'lessonId', description: 'UUID of the lesson to mark as complete' })
  @ApiResponse({ status: 200, description: 'Lesson marked as completed', schema: { example: { success: true } } })
  @ApiNotFoundResponse({ description: 'Enrollment or lesson not found' })
  @ApiForbiddenResponse({ description: 'You do not own this enrollment' })
  @ApiConflictResponse({ description: 'Lesson already marked as completed' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @HttpCode(HttpStatus.OK)
  @Post(':enrollmentId/lessons/:lessonId/complete')
  markLessonCompleted(
    @Request() req: any,
    @Param('enrollmentId') enrollmentId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonProgressService.markLessonCompleted(enrollmentId, req.user.id, lessonId);
  }
}
