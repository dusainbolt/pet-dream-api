/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccountRole, AccountStatus } from 'src/api/account/account.interface';
import { ADMIN_ID } from 'src/common/constant';
import { Account } from 'src/entities/account.entity';
import { PetColor } from 'src/entities/pet-color.entity';
import { PetSpecialType } from 'src/entities/pet-special-type.entity';

const petColorData = require('../../data/seeding/pet_color.json');
const petSpecialTypeData = require('../../data/seeding/pet_special_type.json');

@Injectable()
export class SeedingService implements OnModuleInit {
  async onModuleInit() {
    await this.seedingAdmin();
    await this.seedingPetColor();
    await this.seedingPetSpecialType();
  }

  async seedingAdmin() {
    try {
      const existAdmin = await Account.findOneBy({
        email: 'dulh181199@gmail.com',
        username: 'dusainbolt',
      });
      if (!existAdmin) {
        console.log('🚀 ~ file: seeding.service.ts ~ seedingAdmin');
        await Account.insert({
          id: ADMIN_ID,
          email: 'dulh181199@gmail.com',
          username: 'dusainbolt',
          fullName: 'Lê Huy Du',
          password: '$2b$10$vVo8WJsK7b7SJJ4I5QCop.BBlIyhVb4VndSQvkTBgXfDyKcUyu/i.',
          status: AccountStatus.ACTIVE,
          role: AccountRole.ADMIN,
        });
      }
    } catch (e) {
      console.log('====Error seedingAdmin: ', e.toString());
    }
  }

  async seedingPetColor() {
    try {
      const existPetColor = await PetColor.findOneById(1);
      if (!existPetColor) {
        console.log('🚀 ~ file: seeding.service.ts ~ seedingPetColor');
        for (let i = 0; i < petColorData.length - 1; i++) {
          await PetColor.insert(petColorData[i]);
        }
      }
    } catch (e) {
      console.log('====Error seedingPetColor: ', e.toString());
    }
  }

  async seedingPetSpecialType() {
    try {
      const existPetSpecialType = await PetSpecialType.findOneById(1);
      if (!existPetSpecialType) {
        console.log('🚀 ~ file: seeding.service.ts ~ seedingPetSpecialType');
        for (let i = 0; i < petSpecialTypeData.length - 1; i++) {
          await PetSpecialType.insert(petSpecialTypeData[i]);
        }
      }
    } catch (e) {
      console.log('====Error seedingPetSpecialType: ', e.toString());
    }
  }
}
