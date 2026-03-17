import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentEntity {
  @ApiProperty({ example: 'e1a2b3c4-0001-4e4e-aa1a-000000000001', description: 'Unique enrollment ID (UUID)' })
  id: string;

  @ApiProperty({ example: 'u1b2c3d4-0001-4e4e-aa1a-000000000001', description: 'UUID of the enrolled student' })
  student_id: string;

  @ApiProperty({ example: 'c7b3d1a2-0001-4e4e-bb1a-000000000001', description: 'UUID of the enrolled course' })
  course_id: string;

  @ApiProperty({ example: 35.5, description: 'Completion percentage (0–100)' })
  progress_percentage: number;

  @ApiProperty({ example: '2026-01-10T00:00:00.000Z', description: 'When the student enrolled' })
  enrolled_at: Date;

  @ApiProperty({ example: '2026-01-15T00:00:00.000Z' })
  updated_at: Date;
}
