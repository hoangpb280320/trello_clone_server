import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { ErrMessage, SuccessMessage } from 'src/common/message';
import { handleException } from 'src/untils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, Token } from 'src/common/types';
import { LoginTdo, RegisterTdo } from './dto';
import { AuthTokenRepository } from 'src/repositories/AuthToken.repository';
import { User } from 'src/entities';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterTdo): Promise<ApiResponse<Token>> {
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

      await this.saveAuthToken(newUser, refreshToken, accessToken);

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

  async login(data: LoginTdo): Promise<ApiResponse<Token>> {
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

      await this.saveAuthToken(user, refreshToken, accessToken);

      // this.saveRefreshTokenToCookie(refreshToken, res);

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

  async logout(userId: string): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(ErrMessage.userNotExist);
      }
      const authToken = await this.authTokenRepository.findById(userId);
      if (!authToken) {
        throw new NotFoundException(ErrMessage.userNotActive);
      }
      await this.authTokenRepository.deleteEntity(authToken.id);
      return {
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      handleException(error);
    }
  }

  // async refreshToken({accessToken, refreshToken}:{refreshToken: string, accessToken: string}): Promise<ApiResponse<Token>> {
  //   try {
  //     const payload = await this.verifyToken(refreshToken);
  //     if (!payload) {
  //       throw new UnauthorizedException(ErrMessage.tokenInvalid);
  //     }
  //     this.
  //   } catch (error) {
  //     handleException(error);
  //   }
  // }

  async verifyToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
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

  async saveAuthToken(user: User, refreshToken: string, accessToken: string) {
    try {
      const authToken = await this.authTokenRepository.findById(user.id);
      if (authToken) {
        await this.authTokenRepository.updateEntity(authToken.id, {
          refreshToken,
          accessToken,
        });
      }
      await this.authTokenRepository.createEntity({
        user,
        refreshToken,
        accessToken,
      });
    } catch (error) {
      handleException(error);
    }
  }

  saveRefreshTokenToCookie(token: string, res: Response) {
    res.cookie('refresh-token', token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
