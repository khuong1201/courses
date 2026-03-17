import { Controller, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ModulesService } from './modules.service';
import { Role } from '@prisma/client';
import { Auth } from '../../common/decorators/auth.decorator';
import { CreateModuleDto } from './dto/create-module.dto';
import { CourseModuleEntity } from './entities/course-module.entity';

@ApiTags('🗂️ Curriculum — Modules')
@ApiBearerAuth()
@Auth(Role.INSTRUCTOR, Role.ADMIN)
@Controller('curriculum')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @ApiOperation({
    summary: 'Create a new module in a course',
    description: 'Adds a new section/module to an existing course. Only the course owner can add modules.',
  })
  @ApiParam({ name: 'courseId', description: 'UUID of the target course' })
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({ status: 201, description: 'Module created successfully', type: CourseModuleEntity })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @ApiForbiddenResponse({ description: 'You can only add modules to your own courses' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Post('courses/:courseId/modules')
  createModule(
    @Request() req: any,
    @Param('courseId') courseId: string,
    @Body() createModuleDto: CreateModuleDto,
  ) {
    return this.modulesService.createModule(courseId, req.user.id, createModuleDto.title, createModuleDto.order);
  }

  @ApiOperation({
    summary: 'Update a module',
    description: 'Update the title or order of an existing module. Only the course owner can update.',
  })
  @ApiParam({ name: 'moduleId', description: 'UUID of the module to update' })
  @ApiBody({ schema: { properties: { title: { type: 'string', example: 'Updated Module Title' } }, required: ['title'] } })
  @ApiResponse({ status: 200, description: 'Module updated', type: CourseModuleEntity })
  @ApiNotFoundResponse({ description: 'Module not found' })
  @ApiForbiddenResponse({ description: 'You do not own this module' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Patch('modules/:moduleId')
  updateModule(
    @Request() req: any,
    @Param('moduleId') moduleId: string,
    @Body('title') title: string,
  ) {
    return this.modulesService.updateModule(moduleId, req.user.id, title);
  }

  @ApiOperation({
    summary: 'Delete a module',
    description: 'Deletes a module and ALL of its lessons (cascade delete). This action is irreversible.',
  })
  @ApiParam({ name: 'moduleId', description: 'UUID of the module to delete' })
  @ApiResponse({ status: 200, description: 'Module and its lessons deleted' })
  @ApiNotFoundResponse({ description: 'Module not found' })
  @ApiForbiddenResponse({ description: 'You do not own this module' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Delete('modules/:moduleId')
  deleteModule(@Request() req: any, @Param('moduleId') moduleId: string) {
    return this.modulesService.deleteModule(moduleId, req.user.id);
  }
}
