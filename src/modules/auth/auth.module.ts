import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenRepository } from 'src/repositories/AuthToken.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, AuthTokenRepository],
})
export class AuthModule {}
