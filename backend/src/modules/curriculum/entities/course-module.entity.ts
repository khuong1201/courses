import { ApiProperty } from '@nestjs/swagger';

export class CourseModuleEntity {
  @ApiProperty({ example: 'm1a2b3c4-0001-4e4e-aa1a-000000000001', description: 'Unique module ID (UUID)' })
  id: string;

  @ApiProperty({ example: 'c7b3d1a2-0001-4e4e-bb1a-000000000001', description: 'Parent course UUID' })
  course_id: string;

  @ApiProperty({ example: 'Module 1: Introduction', description: 'Module display title' })
  title: string;

  @ApiProperty({ example: 1, description: 'Display order within the course (1-based)' })
  order: number;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2026-01-15T00:00:00.000Z' })
  updated_at: Date;
}
