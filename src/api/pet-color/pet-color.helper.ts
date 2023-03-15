import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'src/common/service/base-repository'
import { PetColor } from 'src/entities/pet-color.entity'
import { Repository } from 'typeorm'
export class PetService {}

@Injectable()
export class PetColorHelper extends BaseRepository<PetColor> {
  constructor (@InjectRepository(PetColor) readonly petColorRepo: Repository<PetColor>) {
    super(petColorRepo)
  }
}
