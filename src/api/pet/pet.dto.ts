import { IsSwaggerEnum, IsSwaggerNumber, IsSwaggerString } from 'src/common/decorators';
import { PetGender } from 'src/entities/pet.entity';

export class PetCreateDto {
  @IsSwaggerString({ default: 'Lê Zăn Đạt' })
  name: string;

  @IsSwaggerString({ default: 'Đẹt Đần' })
  nickName: string;

  @IsSwaggerString({ default: 'Bio của Đẹt Đần' })
  bio: string;

  @IsSwaggerString({ default: 'Thích bỏ nhà đi bụi' })
  favorite: string;

  @IsSwaggerNumber({ default: 1678505251 })
  birthday: number;

  @IsSwaggerEnum(PetGender, {}, true)
  gender: PetGender;
}
