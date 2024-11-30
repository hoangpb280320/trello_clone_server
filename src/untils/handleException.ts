import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleException = (error: HttpException) => {
  console.error(error);
  if (error instanceof InternalServerErrorException) {
    throw new InternalServerErrorException();
  }
  throw error;
};
