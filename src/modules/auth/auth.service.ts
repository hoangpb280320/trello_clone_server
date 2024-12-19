import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { ErrMessage, SuccessMessage } from 'src/common/message';
import { RegisterTdo } from './dto';
import { handleException } from 'src/untils';
import { LoginTdo } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, Token } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
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

      const payload = { email: newUser.email, id: newUser.username };
      const accessToken = await this.generateAccessToken(payload);
      const refreshToken = await this.generateRefreshToken(payload);

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
      const payload = { email: user.email, id: user.username };
      const accessToken = await this.generateAccessToken(payload);
      const refreshToken = await this.generateRefreshToken(payload);
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

  async isMatchPassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
      secret: process.env.JWT_SECRET,
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
