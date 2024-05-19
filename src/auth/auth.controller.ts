import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.signUp(registerDto);
  }
}
