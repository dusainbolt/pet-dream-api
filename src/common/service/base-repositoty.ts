import { DeepPartial, DeleteResult, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseRepository<T> {
  private _repo: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repo = repository;
  }

  index(): Promise<T[]> {
    return this._repo.find();
  }

  findOneBy(data: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this._repo.findOneBy(data);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this._repo.findOne(options);
  }

  findById(id: EntityId): Promise<T> {
    return this._repo.findOneById(id);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this._repo.findByIds(ids);
  }

  store(data: DeepPartial<T>): Promise<T> {
    return this._repo.save(data);
  }

  async update(id: EntityId, data: DeepPartial<T>): Promise<T> {
    await this._repo.update(id, data as any);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this._repo.delete(id);
  }
}
