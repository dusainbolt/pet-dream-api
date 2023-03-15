import { Injectable } from '@nestjs/common';
import { PetColorHelper } from './pet-color.helper';

@Injectable()
export class PetColorService {
  constructor(private readonly petColorHelper: PetColorHelper) {}

  public getPetColorData = async () => {
    return await this.petColorHelper.find({ select: { id: true, value: true } });
  };
}
