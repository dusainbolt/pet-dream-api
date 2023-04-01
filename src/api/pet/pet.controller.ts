import { Body, Get, Param, Post, Put, Query, Req, UploadedFiles } from '@nestjs/common';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { RequestUser } from 'src/common/interfaces';
import { PaginateOptionsDto } from 'src/common/pagination';
import { PetAvatarUploadInterceptor, PetCoverUploadInterceptor } from 'src/common/pipe/multer.Interceptor';
import { PetCreateDto, PetUpdateAvatarDto, PetUpdateCoverDto, PetUpdateDto } from './pet.dto';
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

  @Post('/:id/avatar')
  @ApiConsumes('multipart/form-data')
  @PetAvatarUploadInterceptor()
  @ApiOperation({ summary: 'Update avatar of pet' })
  async updatePetAvatar(
    @Req() req: RequestUser,
    @Param('id') id: number,
    @UploadedFiles()
    files: { avatar: Express.Multer.File[] },
    @Body() _: PetUpdateAvatarDto
  ) {
    return await this.petService.updateAvatar(req.user, id, files.avatar[0]);
  }

  @Post('/:id/cover')
  @ApiConsumes('multipart/form-data')
  @PetCoverUploadInterceptor()
  @ApiOperation({ summary: 'Update cover of pet' })
  async updatePetCover(
    @Req() req: RequestUser,
    @Param('id') id: number,
    @UploadedFiles()
    files: { cover: Express.Multer.File[] },
    @Body() _: PetUpdateCoverDto
  ) {
    return await this.petService.updateCover(req.user, id, files.cover[0]);
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

  @Get('/')
  @ApiOperation({ summary: 'Get list pets' })
  async getListPets(@Query() query: PaginateOptionsDto) {
    return await this.petService.getListPets(query);
  }
}
