export class PetService {}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/service/base-repositoty';
import { Pet } from 'src/entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetHelper extends BaseRepository<Pet> {
  constructor(@InjectRepository(Pet) readonly petRepository: Repository<Pet>) {
    super(petRepository);
  }

  async findByName(name: string): Promise<Pet | null> {
    return await this.findOneBy({ name });
  }

  //   getInactiveUsers(): Promise<User[]> {
  //     return this.repository.getInactiveUsers();
  //   }
}
