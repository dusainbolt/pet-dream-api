import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseRepository<T> {
  private readonly _repo: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repo = repository;
  }

  async index(): Promise<T[]> {
    return await this._repo.find();
  }

  async findOneBy(data: FindOptionsWhere<T> | Array<FindOptionsWhere<T>>): Promise<T> {
    return await this._repo.findOneBy(data);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this._repo.findOne(options);
  }

  async findById(id: EntityId): Promise<T> {
    return await this._repo.findOneById(id);
  }

  async findByIds(ids: [EntityId]): Promise<T[]> {
    return await this._repo.findByIds(ids);
  }

  async store(data: DeepPartial<T>): Promise<T> {
    return await this._repo.save(data);
  }

  async update(id: EntityId, data: DeepPartial<T>): Promise<T> {
    await this._repo.update(id, data as any);
    return await this.findById(id);
  }

  async delete(id: EntityId): Promise<DeleteResult> {
    return await this._repo.delete(id);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await this._repo.find(options);
  }
}
