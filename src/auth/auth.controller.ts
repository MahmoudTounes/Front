import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    console.log('birthDate received:', registerAuthDto.birthDate);
    return this.authService.register(registerAuthDto);
  }


  @Post('login')
  async login(@Body(ValidationPipe) loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}

 