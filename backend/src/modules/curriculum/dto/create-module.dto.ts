import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({ description: 'Title of the module', example: 'Introduction to UI Design' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Order of the module in the course', example: 1 })
  @IsNumber()
  order: number;
}
