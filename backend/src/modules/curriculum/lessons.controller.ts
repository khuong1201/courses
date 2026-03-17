import { Controller, Post, Body, Param, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { Role } from '@prisma/client';
import { Auth } from '../../common/decorators/auth.decorator';
import { CreateLessonDto } from './dto/create-lesson.dto';

@ApiTags('📖 Curriculum — Lessons')
@ApiBearerAuth()
@Auth(Role.INSTRUCTOR, Role.ADMIN)
@Controller('curriculum')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({
    summary: 'Add a new lesson to a module',
    description: 'Creates a lesson (VIDEO, TEXT, or QUIZ) inside a module. Only the course owner can add lessons.',
  })
  @ApiParam({ name: 'moduleId', description: 'UUID of the parent module' })
  @ApiResponse({ status: 201, description: 'Lesson created' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Module not found' })
  @ApiForbiddenResponse({ description: 'You do not own this module\'s course' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Post('modules/:moduleId/lessons')
  createLesson(
    @Request() req: any,
    @Param('moduleId') moduleId: string,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.createLesson(moduleId, req.user.id, createLessonDto);
  }
}
