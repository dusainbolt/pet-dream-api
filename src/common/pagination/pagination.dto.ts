import { IsSwaggerNumber, IsSwaggerString } from '../decorators';
import { PaginateLimit } from './pagination.decorator';
import { PAGINATION } from '../constant';
import { Transform } from 'class-transformer';

export class PaginateQueryDto {
  @IsSwaggerString({}, false)
  @Transform(({ value }) => value && value.trimEnd().trimStart())
  search?: string;

  @IsSwaggerString({}, false)
  filter?: string;

  @IsSwaggerString({}, false)
  sort?: string;

  @IsSwaggerString({}, false)
  group?: string;
}

export class PaginateOptionsDto extends PaginateQueryDto {
  @PaginateLimit({ default: 1 }, PAGINATION.PAGE_MAX)
  readonly page: number = 1;

  @PaginateLimit({ default: 10 }, PAGINATION.SIZE_MAX)
  readonly limit: number = 10;
}

export class TimezoneDto {
  @IsSwaggerNumber({ minimum: -12, maximum: 12, description: 'From -12 to 12' }, false)
  @Transform(({ value }) => value && +value)
  timezone = 0;
}
