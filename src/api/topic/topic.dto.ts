import { IsSwaggerBoolean, IsSwaggerString } from 'src/common/decorators';
import { PaginateOptionsDto } from 'src/common/pagination';

export class TopicCreateDto {
  @IsSwaggerString({ default: 'Hom nay co chuyen vui muon chia se' })
  title: string;

  @IsSwaggerString({ default: 'Xin duoc viec lam luong cao' })
  description: string;
}

export class TopicGetByUserDto extends PaginateOptionsDto {
  @IsSwaggerString({ default: 'false' }, false)
  lastMessage: string;

  @IsSwaggerString({ default: '0' }, false)
  latestMessageId?: string;

  @IsSwaggerString({ default: 'false' }, false)
  account: string;
}

export class TopicGetDetailDto {
  @IsSwaggerString({ default: 'false' }, false)
  account: string;
}

export class TopicGetByAdmin extends TopicGetByUserDto {}
