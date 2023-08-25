import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserResponse } from './interfaces/user-response.interface';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'User registered' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged' })
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserResponse> {
    return this.authService.login(loginUserDto);
  }
}
