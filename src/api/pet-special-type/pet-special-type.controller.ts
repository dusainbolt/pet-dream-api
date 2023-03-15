import { Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { PetSpecialTypeService } from './pet-special-type.service';

@IsAuthController(ENTITY_NAME.PET_SPECIAL_TYPE, 'PetSpecialType')
export class PetSpecialTypeController {
  constructor(private readonly petSpecialTypeService: PetSpecialTypeService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get pet special type data' })
  async getListPetsOfAccount() {
    return await this.petSpecialTypeService.getPetSpecialTypeData();
  }
}
