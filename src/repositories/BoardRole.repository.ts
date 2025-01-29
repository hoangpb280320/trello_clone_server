import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BoardRole } from 'src/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class BoardRoleRepository extends BaseRepository<BoardRole> {
  constructor(dataSource: DataSource) {
    super(BoardRole, dataSource);
  }
}
