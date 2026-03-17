import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Auth } from '../../common/decorators/auth.decorator';
import { Role } from '@prisma/client';

@ApiTags('Courses Management')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Public: List all published courses
  @Get()
  findAllPublic() {
    return this.coursesService.findAllPublished();
  }

  // Instructor Only: Create a new draft course
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Post()
  create(@Request() req: any, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req.user.id, createCourseDto);
  }

  // Instructor Only: Get all my courses
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Get('my-courses')
  findAllMyCourses(@Request() req: any) {
    return this.coursesService.findAllByInstructor(req.user.id);
  }

  // Public: get course details (including modules/lessons)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  // Instructor Only: Update course info
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, req.user.id, updateCourseDto);
  }

  // Instructor Only: Publish course
  @Auth(Role.INSTRUCTOR, Role.ADMIN)
  @Patch(':id/publish')
  publish(@Request() req: any, @Param('id') id: string) {
    return this.coursesService.publish(id, req.user.id);
  }
}
