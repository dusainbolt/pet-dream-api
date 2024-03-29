import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/service/base-repository';
import { Pet } from 'src/entities/pet.entity';
import { Repository } from 'typeorm';
export class PetService {}

@Injectable()
export class PetHelper extends BaseRepository<Pet> {
  constructor(@InjectRepository(Pet) readonly petRepo: Repository<Pet>) {
    super(petRepo);
  }

  async findByName(name: string): Promise<Pet | null> {
    return await this.findOneBy({ name });
  }

  async findByAccAndName(accountId: any, name: string): Promise<Pet | null> {
    return await this.findOneBy({ accountId, name });
  }

  async findByAccAndId(accountId: any, id: number): Promise<Pet | null> {
    return await this.findOneBy({ accountId, id });
  }
}
