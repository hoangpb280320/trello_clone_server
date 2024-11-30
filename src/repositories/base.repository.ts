import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class BaseRepository<T> extends Repository<T> {
  constructor(
    private readonly entity: new () => T,
    private readonly dataSource: DataSource,
  ) {
    super(entity, dataSource.createEntityManager());
  }

  async createEntity(data: DeepPartial<T>): Promise<T> {
    const entity = this.create(data);
    return this.save(entity);
  }

  async findOneEntity(options: FindOneOptions<T>): Promise<T | null> {
    return await this.findOne(options);
  }

  async findAllEntities(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.find(options);
  }

  async updateEntity(
    id: string | number,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.update(id, data);
  }

  async deleteEntity(id: string | number): Promise<void> {
    await this.delete(id);
  }
}
