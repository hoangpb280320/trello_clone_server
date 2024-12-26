import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterTdo } from './dto';
import { LoginTdo } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() data: RegisterTdo, @Res({ passthrough: true }) res: Response) {
    return this.authService.register({ data, res });
  }

  @Post('/login')
  login(@Body() data: LoginTdo, @Res({ passthrough: true }) res: Response) {
    return this.authService.login({ data, res });
  }

  @Post('/refesh-token')
  refreshToken(@Req() req: Request) {
    const refreshToken = req.cookies['refresh_token'] || null;
    return this.authService.refreshToken(refreshToken);
  }
}
