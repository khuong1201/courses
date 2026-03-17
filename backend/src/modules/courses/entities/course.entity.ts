import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseStatus } from '@prisma/client';

export class CourseEntity {
  @ApiProperty({ example: 'c7b3d1a2-0001-4e4e-bb1a-000000000001', description: 'Unique course ID (UUID)' })
  id: string;

  @ApiProperty({ example: 'u1b2c3d4-0001-4e4e-aa1a-000000000001', description: 'UUID of the instructor who owns this course' })
  instructor_id: string;

  @ApiProperty({ example: 'Advanced React Patterns', description: 'Course title' })
  title: string;

  @ApiPropertyOptional({ example: 'Learn advanced patterns for scalable React applications', nullable: true })
  description: string | null;

  @ApiPropertyOptional({ example: 'Frontend Development', nullable: true })
  category: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/images/react-course.jpg', nullable: true })
  cover_image: string | null;

  @ApiProperty({ enum: CourseStatus, example: CourseStatus.DRAFT, description: 'Publishing status of the course' })
  status: CourseStatus;

  @ApiProperty({ example: 49.99, description: 'Course price in USD' })
  price: number;

  @ApiProperty({ example: 4.8, description: 'Average student rating (0–5)' })
  average_rating: number;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2026-01-15T00:00:00.000Z' })
  updated_at: Date;
}
