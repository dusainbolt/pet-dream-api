import { Body, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { RequestUser } from 'src/common/interfaces';
import { PaginateOptionsDto } from 'src/common/pagination';
import { PetCreateDto, PetUpdateDto } from './pet.dto';
import { PetService } from './pet.service';

@IsAuthController(ENTITY_NAME.PET, 'PetUser')
export class PetUserController {
  constructor(private readonly petService: PetService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new pet' })
  async createNewPet(@Req() req: RequestUser, @Body() body: PetCreateDto) {
    return await this.petService.createPet(req.user, body);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update your pet' })
  async updateYourPet(@Req() req: RequestUser, @Param('id') id: number, @Body() body: PetUpdateDto) {
    return await this.petService.updatePet(req.user, id, body);
  }

  @Get('/my-pets')
  @ApiOperation({ summary: 'Get list pets of account' })
  async getListPetsOfAccount(@Req() req: RequestUser, @Query() query: PaginateOptionsDto) {
    return await this.petService.getListPetsOfAccount(req.user, query);
  }
}

@IsAuthController(ENTITY_NAME.PET, 'Pet', false)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get pet info' })
  async getPetInfo(@Param('id') id: number) {
    return await this.petService.getPetInfo(id);
  }
}
