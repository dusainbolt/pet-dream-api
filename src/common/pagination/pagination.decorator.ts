import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export function PaginateLimit(options: ApiPropertyOptions = {}, max = 25) {
  return applyDecorators(
    ApiPropertyOptional({ minimum: 1, maximum: max, ...options }),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(max),
    IsOptional(),
  );
}
