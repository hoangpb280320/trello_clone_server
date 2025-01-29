import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Board } from 'src/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class BoardRepository extends BaseRepository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource);
  }

  async findById(id: number): Promise<Board | null> {
    return this.findOneEntity({ where: { id } });
  }
}
