import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.stratery';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    GoogleStrategy,
    {
      provide: OAuth2Client,
      useFactory: () => {
        return new OAuth2Client(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
        );
      },
    },
  ],
})
export class AuthModule {}
