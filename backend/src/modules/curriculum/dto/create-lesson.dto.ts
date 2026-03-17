import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LessonType } from '@prisma/client';

export class CreateLessonDto {
  @ApiProperty({ description: 'Title of the lesson', example: 'What is UI Design?' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: LessonType, example: LessonType.VIDEO })
  @IsEnum(LessonType)
  contentType: LessonType;

  @ApiPropertyOptional({ description: 'URL for video lessons' })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Text content for text lessons' })
  @IsString()
  @IsOptional()
  textContent?: string;

  @ApiProperty({ description: 'Order of the lesson within the module', example: 1 })
  @IsNumber()
  order: number;
}
