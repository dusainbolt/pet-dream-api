import { IsSwaggerEnum, IsSwaggerNumber, IsSwaggerString } from 'src/common/decorators';
import { PetEar, PetEye, PetGender, PetHair, PetTail } from 'src/entities/pet.entity';

export class PetCreateDto {
  @IsSwaggerString({ default: 'Lê Zăn Đạt' })
  name: string;

  @IsSwaggerString({ default: 'Đẹt Đần' })
  nickName: string;

  @IsSwaggerNumber({ default: 1678505251 })
  birthday: number;

  @IsSwaggerEnum(PetGender, { default: PetGender.FEMALE })
  gender: PetGender;
}

export class PetUpdateDto extends PetCreateDto {
  @IsSwaggerString({ default: 'Bio của Đẹt Đần' })
  bio: string;

  @IsSwaggerString({ default: 'Thích bỏ nhà đi bụi' })
  favorite: string;

  @IsSwaggerEnum(PetTail, { default: PetTail.COC })
  tail: PetTail;

  @IsSwaggerEnum(PetEar, { default: PetEar.CUP })
  ear: PetEar;

  @IsSwaggerEnum(PetEye, { default: PetEye.DICHROIC })
  eye: PetEye;

  @IsSwaggerEnum(PetHair, { default: PetHair.BRUSH })
  hair: PetHair;

  @IsSwaggerNumber({ default: 1678505251 })
  birthday: number;

  @IsSwaggerNumber({ default: 1 })
  petColorId: number;

  @IsSwaggerNumber({ default: 1 })
  petSpecialTypeId: number;
}
