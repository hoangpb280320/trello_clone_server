import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterTdo } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() data: RegisterTdo) {
    return this.authService.register(data);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
