import { ApiProperty } from '@nestjs/swagger';

export class CourseModuleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  course_id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
