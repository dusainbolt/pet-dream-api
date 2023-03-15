import { Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { PetColorService } from './pet-color.service';

@IsAuthController(ENTITY_NAME.PET_COLOR, 'PetColor')
export class PetColorController {
  constructor(private readonly petColorService: PetColorService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get pet color data' })
  async getListPetsOfAccount() {
    return await this.petColorService.getPetColorData();
  }
}
