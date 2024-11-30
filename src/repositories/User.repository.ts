import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { User } from 'src/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneEntity({ where: { email } });
  }
}
