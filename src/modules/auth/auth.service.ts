import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { ErrMessage } from 'src/common/message';
import { RegisterTdo } from './dto';
import { handleException } from 'src/untils';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: RegisterTdo) {
    try {
      const { email } = data;
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        throw new ConflictException(ErrMessage.emailExist);
      }
      return await this.userRepository.createEntity(data);
    } catch (error) {
      handleException(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }
}
