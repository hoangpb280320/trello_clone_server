import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterTdo } from './dto';
import { LoginTdo } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() data: RegisterTdo) {
    return this.authService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginTdo) {
    return this.authService.login(data);
  }
}
