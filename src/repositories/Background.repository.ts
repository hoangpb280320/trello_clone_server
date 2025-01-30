import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { Background } from 'src/entities/background.entity';

@Injectable()
export class BackgroundRepository extends BaseRepository<Background> {
  constructor(dataSource: DataSource) {
    super(Background, dataSource);
  }

  async findById(id: string): Promise<Background | null> {
    return this.findOneEntity({ where: { id } });
  }
}
