import { HttpStatus } from '@nestjs/common';
import { AppError, ERROR_CODE } from '../interfaces/error.interface';

export const ERROR: Record<ERROR_CODE, AppError> = {
  // COMMON
  [ERROR_CODE.ERROR_EXCEPTION]: {
    code: '0000',
    message: 'Error test',
    status: HttpStatus.OK,
  },

  //AUTH
  [ERROR_CODE.AUTH_TOKEN_CLAIMS_BEFORE]: {
    code: '0001',
    message: 'Your token has been claims before create',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_TOKEN_EXPIRED]: {
    code: '0002',
    message: 'Your token have been expired',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_TOKEN_INVALID]: {
    code: '0003',
    message: 'Your token is invalid',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_PASSWORD_INCORRECT]: {
    code: '0004',
    message: 'Your password is incorrectly',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN]: {
    code: '0005',
    message: 'Require token in cookie header',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_NOT_FOUND_OTP]: {
    code: '0006',
    message: 'Not found verify otp of user',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.AUTH_OTP_NOT_MATCH]: {
    code: '0007',
    message: 'Your otp is not match',
    status: HttpStatus.OK,
  },

  // ACCOUNT 1xxx
  [ERROR_CODE.ACCOUNT_INACTIVE]: {
    code: '1000',
    message: 'User not active',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER]: {
    code: '1001',
    message: 'username or email is already exist',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.ACCOUNT_NOT_FOUND]: {
    code: '1002',
    message: 'User not found',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.ACCOUNT_VERIFIED]: {
    code: '1003',
    message: 'User is verified',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.ACCOUNT_NOT_VERIFIED]: {
    code: '1004',
    message: `User isn't verified`,
    status: HttpStatus.OK,
  },

  // PET 2xxx
  [ERROR_CODE.PET_NAME_EXIST_BY_ACCOUNT]: {
    code: '2000',
    message: `Pet name is exist by account`,
    status: HttpStatus.OK,
  },
  [ERROR_CODE.PET_NOT_FOUND]: {
    code: '2001',
    message: `Pet not found`,
    status: HttpStatus.OK,
  },
  [ERROR_CODE.PET_WRONG_ACCOUNT]: {
    code: '2002',
    message: `Pet wrong account`,
    status: HttpStatus.OK,
  },
  // PET_COLOR 3xxx
  [ERROR_CODE.PET_COLOR_NOT_FOUND]: {
    code: '3000',
    message: `Pet color not found`,
    status: HttpStatus.OK,
  },
  // PET_SPECIAL_TYPE 4xxx
  [ERROR_CODE.PET_SPECIAL_TYPE_NOT_FOUND]: {
    code: '4000',
    message: `Pet special type not found`,
    status: HttpStatus.OK,
  },
};
