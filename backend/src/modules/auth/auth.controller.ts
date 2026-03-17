import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthTokenResponseDto } from './dto/auth.dto';

@ApiTags('🔐 Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with the given email, password, full name, and optional role.',
  })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterDto })
  @ApiBadRequestResponse({ description: 'Invalid input data (validation failed)' })
  @ApiConflictResponse({ description: 'Email is already registered' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: 'Login and get access token',
    description: 'Authenticates the user and returns a JWT access token valid for 7 days.',
  })
  @ApiResponse({ status: 200, description: 'Login successful — returns JWT token', type: AuthTokenResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @ApiBadRequestResponse({ description: 'Missing or invalid fields' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
