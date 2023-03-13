import { Body, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { RequestUser } from 'src/common/interfaces';
import { PetCreateDto } from './pet.dto';
import { PetService } from './pet.service';

@IsAuthController(ENTITY_NAME.PET, 'PetUser')
export class PetUserController {
  constructor(private readonly petService: PetService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new pet' })
  async createNewPet(@Req() req: RequestUser, @Body() body: PetCreateDto) {
    return await this.petService.createPet(req.user, body);
  }
}
