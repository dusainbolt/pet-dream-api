import { applyDecorators, Controller, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiProperty,
  ApiPropertyOptions,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinDate,
  ValidateNested,
} from 'class-validator';
import { ReasonPhrases } from 'http-status-codes';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { RolesGuard } from 'src/api/auth/roles.guard';
// import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
// import { RolesGuard } from 'src/api/auth/roles.guard';
import commonConstant, { DATE_FORMAT } from 'src/common/constant';

class UnauthorizedDataDto {
  @IsSwaggerNumber({ default: ReasonPhrases.UNAUTHORIZED }, false)
  status;

  // @IsSwaggerString(
  //   { default: ERROR[ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN].message },
  //   false,
  // )
  // error;

  // @IsSwaggerString(
  //   { default: ERROR[ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN].code },
  //   false,
  // )
  // message;
}

class UnauthorizedDto {
  @IsSwaggerNumber({ default: HttpStatus.UNAUTHORIZED }, false)
  status;

  @ApiProperty({ type: UnauthorizedDataDto })
  data: UnauthorizedDataDto;
}

class ForbiddenDataDto {
  @IsSwaggerString({ default: ReasonPhrases.FORBIDDEN }, false)
  error;

  // @IsSwaggerString(
  //   { default: ERROR[ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN].message },
  //   false,
  // )
  // message;

  // @IsSwaggerString(
  //   { default: ERROR[ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN].code },
  //   false,
  // )
  // errorCode;
}

class ForbiddenDto {
  @IsSwaggerNumber({ default: HttpStatus.FORBIDDEN }, false)
  status;

  @ApiProperty({ type: ForbiddenDataDto })
  data: ForbiddenDataDto;
}

export function IsAuthController(name: string, apiTag: string, isRequire = true) {
  return applyDecorators(
    Controller(name),
    ApiTags(apiTag),
    ApiBearerAuth(),
    ...(isRequire ? [UseGuards(JwtAuthGuard, RolesGuard)] : []),
    ...(isRequire
      ? [
          ApiUnauthorizedResponse({
            description: `Require token in header`,
            type: UnauthorizedDto,
          }),
          ApiForbiddenResponse({
            description: `Require active account before using this API`,
            type: ForbiddenDto,
          }),
        ]
      : []),
  );
}

export function IsSwaggerString(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsString(),
    MaxLength(options.maxLength || commonConstant.VARCHAR_MAX_LENGTH),
  );
}

export function IsSwaggerNumber(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'number',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsNumber(),
    Min(options.minimum || 0),
    Max(options.maximum || commonConstant.NUMBER_MAX_LENGTH),
  );
}

export function IsSwaggerArrayNumber(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      type: 'number',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsNumber({}, { each: true }),
  );
}

export function IsSwaggerBoolean(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'boolean',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsBoolean(),
  );
}

export function IsSwaggerDate(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'date',
      default: new Date(),
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsDate(),
    MinDate(new Date(DATE_FORMAT.MIN_DATE)),
  );
}

export function IsSwaggerEnum(enumData: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'enum',
      enum: enumData,
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsEnum(enumData),
  );
}

export function IsSwaggerObject(typeClass: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: typeClass,
      required: isRequire,
      ...options,
    }),
    ...(isRequire ? [ArrayNotEmpty] : []),
    ValidateNested(),
    Type(() => typeClass),
  );
}

export function IsSwaggerArray(typeClass: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      type: typeClass,
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    ...(isRequire ? [ArrayNotEmpty()] : []),
    ValidateNested({ each: true }),
    Type(() => typeClass),
    ArrayMinSize(options.minProperties || commonConstant.ARRAY_MIN_SIZE),
    ArrayMaxSize(options.maxProperties || commonConstant.ARRAY_MAX_SIZE),
  );
}

export function IsSwaggerArrayString(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsString({ each: true }),
  );
}

export function IsSwaggerUpload(options: ApiPropertyOptions = {}, isRequire = false) {
  return applyDecorators(
    ApiProperty({ type: 'string', format: 'binary', ...options }),
    IsSwaggerString(options, isRequire),
  );
}
