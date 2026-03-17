import { Controller, Post, Body, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { Role } from '@prisma/client';
import { Auth } from '../../common/decorators/auth.decorator';
import { CreateLessonDto } from './dto/create-lesson.dto';

@ApiTags('Curriculum Lessons')
@Auth(Role.INSTRUCTOR, Role.ADMIN)
@Controller('curriculum')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({ summary: 'Add a new lesson to a module' })
  @Post('modules/:moduleId/lessons')
  createLesson(@Request() req: any, @Param('moduleId') moduleId: string, @Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.createLesson(moduleId, req.user.id, createLessonDto);
  }
}
