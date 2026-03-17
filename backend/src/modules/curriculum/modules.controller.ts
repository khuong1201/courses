import { Controller, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModulesService } from './modules.service';
import { Role } from '@prisma/client';
import { Auth } from '../../common/decorators/auth.decorator';
import { CreateModuleDto } from './dto/create-module.dto';
import { CourseModuleEntity } from './entities/course-module.entity';

@ApiTags('Curriculum Modules')
@Auth(Role.INSTRUCTOR, Role.ADMIN)
@Controller('curriculum')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @ApiOperation({ summary: 'Create a new module in a course' })
  @ApiResponse({ status: 201, type: CourseModuleEntity })
  @Post('courses/:courseId/modules')
  createModule(@Request() req: any, @Param('courseId') courseId: string, @Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.createModule(courseId, req.user.id, createModuleDto.title, createModuleDto.order);
  }

  @ApiOperation({ summary: 'Update a module title' })
  @Patch('modules/:moduleId')
  updateModule(@Request() req: any, @Param('moduleId') moduleId: string, @Body('title') title: string) {
    return this.modulesService.updateModule(moduleId, req.user.id, title);
  }

  @ApiOperation({ summary: 'Delete a module and its lessons' })
  @Delete('modules/:moduleId')
  deleteModule(@Request() req: any, @Param('moduleId') moduleId: string) {
    return this.modulesService.deleteModule(moduleId, req.user.id);
  }
}
