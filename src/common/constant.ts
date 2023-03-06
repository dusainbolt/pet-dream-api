const commonConstant = {
  IMAGE_FORMAT_WEBP: 'webp',
  NUMBER_MAX_LENGTH: 2147483647, //POSTGRESQL INT
  VARCHAR_MAX_LENGTH: 255,
  ARRAY_MIN_SIZE: 1,
  ARRAY_MAX_SIZE: 5,
  SPACE: ' ',
  EMPTY: '',
  MAXIMUM_STEP: 100000,
  MINIMUM_STEP: 0,
};

export default commonConstant;

export const REGEX = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
};

export const PAGINATION = {
  SIZE_DEFAULT: 1,
  PAGE_DEFAULT: 25,
  SIZE_MAX: 100,
  PAGE_MAX: 100,
  MIN_DATE: '2022-01-01',
};

export const ENTITY_NAME = {
  AUTH: `auth`,
  ACCOUNT: `account`,
  WALLET: `wallet`,
  LOG: `log`,
  topic: `topic`,
  message: `message`,
};

export const DATE_FORMAT = {
  MIN_DATE: '1970-01-01T00:00:00.000Z',
  TIME_FORMAT: 'yyyy-MM-dd HH:mm:ss:SSS',
  TIME_FORMAT_SHORT: 'yyyyMMdd',
};

export const QuerySort = {
  ASC: 1,
  DESC: -1,
};

export const PATH_EXCLUDE = {
  ACTIVE: '/v1/auth/active-code',
  SIGN_OUT: '/v1/auth/sign-out',
};

export const ADMIN_ID = 1;
