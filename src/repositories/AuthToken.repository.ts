import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { AuthToken } from 'src/entities';
import { DataSource } from 'typeorm';
import { UserRepository } from './User.repository';

@Injectable()
export class AuthTokenRepository extends BaseRepository<AuthToken> {
  constructor(
    dataSource: DataSource,
    readonly userRepository: UserRepository,
  ) {
    super(AuthToken, dataSource);
  }

  async findById(userId: string): Promise<AuthToken | null> {
    return this.findOneEntity({ where: { user: { id: userId } } });
  }
}
