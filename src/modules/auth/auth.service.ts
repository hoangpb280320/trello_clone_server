import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { ErrMessage, SuccessMessage } from 'src/common/message';
import { handleException } from 'src/untils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, Token } from 'src/common/types';
import { LoginTdo, RegisterTdo } from './dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    data,
    res,
  }: {
    data: RegisterTdo;
    res: Response;
  }): Promise<ApiResponse<Token>> {
    try {
      const { email, password } = data;

      const user = await this.userRepository.findByEmail(email);
      if (user) {
        throw new ConflictException(ErrMessage.emailExist);
      }

      const hassPassword = await this.hashPassword(password);
      const newUser = await this.userRepository.createEntity({
        ...data,
        password: hassPassword,
      });

      const payload = { id: newUser.id };
      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);

      this.saveRefreshTokenToCookie(refreshToken, res);

      return {
        statusCode: HttpStatus.CREATED,
        message: SuccessMessage.registerSuccess,
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async login({
    data,
    res,
  }: {
    data: LoginTdo;
    res: Response;
  }): Promise<ApiResponse<Token>> {
    try {
      const { email, password } = data;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException(ErrMessage.emailNotExist);
      }

      const isMatch = await this.isMatchPassword(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException(ErrMessage.passwordNotMatch);
      }

      const payload = { id: user.id };
      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);

      this.saveRefreshTokenToCookie(refreshToken, res);

      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.loginSuccess,
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async refreshToken(refreshToken: string | null): Promise<ApiResponse<Token>> {
    if (!refreshToken) {
      throw new UnauthorizedException(ErrMessage.tokenInvalid);
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const payload = { id: decoded.id };
      const newAccessToken = this.generateAccessToken(payload);
      return {
        statusCode: HttpStatus.OK,
        data: {
          accessToken: newAccessToken,
          refreshToken,
        },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async isMatchPassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
      secret: process.env.JWT_SECRET,
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  saveRefreshTokenToCookie(token: string, res: Response) {
    res.cookie('refresh-token', token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
