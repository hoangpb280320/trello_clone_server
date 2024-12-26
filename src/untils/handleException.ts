import {
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

enum JWTError {
  TokenExpiredError = 'TokenExpiredError',
  JsonWebTokenError = 'JsonWebTokenError',
}

export const handleException = (error: HttpException) => {
  if (error.name === JWTError.TokenExpiredError) {
    throw new UnauthorizedException('Token expired');
  } else if (error.name === JWTError.JsonWebTokenError) {
    throw new UnauthorizedException('Token invalid');
  }

  if (error instanceof InternalServerErrorException) {
    throw new InternalServerErrorException();
  }

  throw error;
};
