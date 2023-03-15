import { Injectable } from '@nestjs/common';
import { PetSpecialTypeHelper } from './pet-special-type.helper';

@Injectable()
export class PetSpecialTypeService {
  constructor(private readonly petSpecialTypeHelper: PetSpecialTypeHelper) {}

  public getPetSpecialTypeData = async () => {
    return await this.petSpecialTypeHelper.find({ select: { id: true, value: true } });
  };
}
