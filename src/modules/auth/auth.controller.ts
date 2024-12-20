import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterTdo } from './dto';
import { LoginTdo } from './dto/login.dto';
import { AuthGuard } from 'src/guards/AuthGuard';

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

  @UseGuards(AuthGuard)
  @Post('/logout/:id')
  logout(@Param('id') userId: string) {
    return this.authService.logout(userId);
  }

  // @Post('/refesh-token')
  // refreshToken(@Req() req: Request) {
  //   const accessToken = req['token'];
  //   const refreshToken = req.cookies['refresh-token'];
  //   return this.authService.refreshToken({ accessToken, refreshToken });
  // }
}
