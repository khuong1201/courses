import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'Title of the course', example: 'Advanced React Patterns' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Course category', example: 'Development' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Price in dollars', example: 49.99 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;
}
