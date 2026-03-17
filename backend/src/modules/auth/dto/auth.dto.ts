import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret123', description: 'Password (minimum 6 characters)', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Full display name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({ enum: Role, default: Role.STUDENT, description: 'User role' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'Registered email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret123', description: 'Account password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthTokenResponseDto {
  @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}
