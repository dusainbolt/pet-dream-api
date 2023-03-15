import { Injectable } from '@nestjs/common';
import { ERROR_CODE } from 'src/common/interfaces';
import { getDefaultQuery, PaginateOptionsDto } from 'src/common/pagination';
import { Account } from 'src/entities/account.entity';
import { Pet } from 'src/entities/pet.entity';
import { AppException } from 'src/middleware';
import { DeepPartial } from 'typeorm';
import { PetColorHelper } from '../pet-color/pet-color.helper';
import { PetSpecialTypeHelper } from '../pet-special-type/pet-special-type.helper';
import { PetCreateDto, PetUpdateDto } from './pet.dto';
import { PetHelper } from './pet.helper';

@Injectable()
export class PetService {
  constructor(
    private readonly PetHelper: PetHelper,
    private readonly petColorHelper: PetColorHelper,
    private readonly petSpecialTypeHelper: PetSpecialTypeHelper,
  ) {}

  public createPet = async (acc: Account, data: PetCreateDto) => {
    const petExistByName = await this.PetHelper.findByAccAndName(acc.id, data.name);
    if (petExistByName && petExistByName.accountId === acc.id) {
      throw new AppException(ERROR_CODE.PET_NAME_EXIST_BY_ACCOUNT);
    }
    const newPetData: DeepPartial<Pet> = {
      birthday: new Date(data.birthday),
      name: data.name,
      nickName: data.nickName,
      gender: data.gender,
      accountId: acc.id,
    };
    const pet = await this.PetHelper.store(newPetData);
    return pet;
  };

  public updatePet = async (acc: Account, petId: number, data: PetUpdateDto) => {
    const petColor = await this.petColorHelper.findById(data.petColorId);
    if (!petColor) {
      throw new AppException(ERROR_CODE.PET_COLOR_NOT_FOUND);
    }

    const petSpecialTypeId = await this.petSpecialTypeHelper.findById(data.petSpecialTypeId);
    if (!petSpecialTypeId) {
      throw new AppException(ERROR_CODE.PET_SPECIAL_TYPE_NOT_FOUND);
    }

    const petById = await this.PetHelper.findById(petId);
    if (!petById) {
      throw new AppException(ERROR_CODE.PET_NOT_FOUND);
    }
    if (petById.accountId !== acc.id) {
      throw new AppException(ERROR_CODE.PET_WRONG_ACCOUNT);
    }

    const petExistByName = await this.PetHelper.findByAccAndName(acc.id, data.name);
    if (petExistByName && petExistByName.id !== petId) {
      throw new AppException(ERROR_CODE.PET_NAME_EXIST_BY_ACCOUNT);
    }

    const updatePetData: DeepPartial<Pet> = {
      birthday: new Date(data.birthday),
      name: data.name,
      nickName: data.nickName,
      gender: data.gender,
      bio: data.bio,
      favorite: data.favorite,
      tail: data.tail,
      ear: data.ear,
      eye: data.eye,
      hair: data.hair,
      petColorId: data.petColorId,
      petSpecialTypeId: data.petSpecialTypeId,
    };
    const pet = await this.PetHelper.update(petId, updatePetData);
    return pet;
  };

  public getListPetsOfAccount = async (acc: Account, data: PaginateOptionsDto) => {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.PetHelper.find({
      where: { accountId: acc.id },
      take,
      skip,
      order,
      relations: { petColor: true, petSpecialType: true },
    });
  };

  public getPetInfo = async (petId: number) => {
    return (
      (await this.PetHelper.findOne({ where: { id: petId }, relations: { petColor: true, petSpecialType: true } })) ||
      null
    );
  };
}
