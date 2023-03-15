export class PetService {}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/service/base-repository';
import { PetSpecialType } from 'src/entities/pet-special-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetSpecialTypeHelper extends BaseRepository<PetSpecialType> {
  constructor(@InjectRepository(PetSpecialType) readonly petSpecialTypeRepo: Repository<PetSpecialType>) {
    super(petSpecialTypeRepo);
  }
}
