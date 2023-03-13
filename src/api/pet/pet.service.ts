import { Injectable } from '@nestjs/common';
import { ERROR_CODE } from 'src/common/interfaces';
import { Account } from 'src/entities/account.entity';
import { Pet } from 'src/entities/pet.entity';
import { AppException } from 'src/middleware';
import { DeepPartial } from 'typeorm';
import { PetCreateDto } from './pet.dto';
import { PetHelper } from './pet.helper';

@Injectable()
export class PetService {
  constructor(private readonly PetHelper: PetHelper) {}

  public createPet = async (acc: Account, data: PetCreateDto) => {
    const petExistByName = await this.PetHelper.findByName(data.name);
    if (petExistByName && petExistByName.accountId === acc.id) {
      throw new AppException(ERROR_CODE.PET_NAME_EXIST_BY_ACCOUNT);
    }
    const newPetData: DeepPartial<Pet> = {
      birthday: new Date(data.birthday),
      name: data.name,
      nickName: data.nickName,
      bio: data.bio,
      favorite: data.favorite,
      gender: data.gender,
      accountId: acc.id,
    };
    const pet = await this.PetHelper.store(newPetData);
    return pet;
  };
}
