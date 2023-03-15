export class PetService {}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/service/base-repository';
import { PetColor } from 'src/entities/pet-color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetColorHelper extends BaseRepository<PetColor> {
  constructor(@InjectRepository(PetColor) readonly petColorRepo: Repository<PetColor>) {
    super(petColorRepo);
  }
}
