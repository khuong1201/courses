import { Controller, Post, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LessonProgressService } from './lesson-progress.service';
import { Auth } from '../../common/decorators/auth.decorator';

@ApiTags('Lesson Progress')
@Auth()
@Controller('enrollments')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @ApiOperation({ summary: 'Mark a lesson as completed' })
  @Post(':enrollmentId/lessons/:lessonId/complete')
  markLessonCompleted(
    @Request() req: any,
    @Param('enrollmentId') enrollmentId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonProgressService.markLessonCompleted(enrollmentId, req.user.id, lessonId);
  }
}
