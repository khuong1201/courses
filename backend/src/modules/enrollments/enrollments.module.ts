import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { LessonProgressService } from './lesson-progress.service';
import { LessonProgressController } from './lesson-progress.controller';

@Module({
  controllers: [EnrollmentsController, LessonProgressController],
  providers: [EnrollmentsService, LessonProgressService],
})
export class EnrollmentsModule {}
