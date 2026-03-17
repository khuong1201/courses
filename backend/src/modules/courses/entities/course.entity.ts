import { ApiProperty } from '@nestjs/swagger';
import { CourseStatus } from '@prisma/client';

export class CourseEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  instructor_id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty({ required: false, nullable: true })
  category: string | null;

  @ApiProperty({ required: false, nullable: true })
  cover_image: string | null;

  @ApiProperty({ enum: CourseStatus })
  status: CourseStatus;

  @ApiProperty({ default: 0 })
  price: number;

  @ApiProperty({ default: 0 })
  average_rating: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
