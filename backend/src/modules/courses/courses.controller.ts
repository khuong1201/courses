import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { Auth } from '../../common/decorators/auth.decorator';
import { Role } from '@prisma/client';

@ApiTags('📚 Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({
    summary: 'List all published courses',
    description: 'Returns a paginated list of all published courses. No authentication required.',
  })
  @ApiResponse({ status: 200, description: 'List of published courses', type: [CourseEntity] })
  @Get()
  findAllPublic() {
    return this.coursesService.findAllPublished();
  }

  @ApiOperation({
    summary: 'Get course details',
    description: 'Returns full details of a course including its modules and lessons.',
  })
  @ApiParam({ name: 'id', description: 'Course UUID', example: 'c7b3d1a2-0001-4e4e-bb1a-000000000001' })
  @ApiResponse({ status: 200, description: 'Course details', type: CourseEntity })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new draft course',
    description: 'Instructor creates a new course in DRAFT status. Must be published before students can enroll.',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Course created', type: CourseEntity })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @ApiForbiddenResponse({ description: 'Only INSTRUCTORs or ADMINs can create courses' })
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Post()
  create(@Request() req: any, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req.user.id, createCourseDto);
  }

  @ApiOperation({ summary: 'Get all my courses (instructor view)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of courses owned by the logged-in instructor', type: [CourseEntity] })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @ApiForbiddenResponse({ description: 'Only INSTRUCTORs or ADMINs can access this endpoint' })
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Get('my-courses')
  findAllMyCourses(@Request() req: any) {
    return this.coursesService.findAllByInstructor(req.user.id);
  }

  @ApiOperation({
    summary: 'Update course details',
    description: 'Update course title, description, category, or price. Only the owner instructor can update.',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiResponse({ status: 200, description: 'Course updated', type: CourseEntity })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @ApiForbiddenResponse({ description: 'Can only update your own courses' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, req.user.id, updateCourseDto);
  }

  @ApiOperation({
    summary: 'Publish a course',
    description: 'Changes course status from DRAFT to PUBLISHED. Once published, students can enroll.',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiResponse({ status: 200, description: 'Course is now published', type: CourseEntity })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @ApiForbiddenResponse({ description: 'Can only publish your own courses' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Patch(':id/publish')
  publish(@Request() req: any, @Param('id') id: string) {
    return this.coursesService.publish(id, req.user.id);
  }
}
