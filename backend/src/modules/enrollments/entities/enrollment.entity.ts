import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  student_id: string;

  @ApiProperty()
  course_id: string;

  @ApiProperty()
  progress_percentage: number;

  @ApiProperty()
  enrolled_at: Date;

  @ApiProperty()
  updated_at: Date;
}
