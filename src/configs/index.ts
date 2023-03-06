import { Env, IConfig } from 'src/common/interfaces/config.interface';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

// export * as database from './database';

const config: IConfig = {
  env: (process.env.NODE_ENV as Env) || Env.DEFAULT,

  server: {
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT) || 8002,
    version: process.env.SERVER_VERSION || 'v1',
  },
  database: {
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 3306,
    synchronize: true,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expireIns: process.env.JWT_EXPIRATION_TIME,
  },
  mail: {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttlOtp: parseInt(process.env.REDIS_TTL_OTP),
    ttlSocketClient: parseInt(process.env.REDIS_TTL_SOCKET_CLIENT),
  },
};

export const configuration = (): IConfig => config;
export default config;
console.log('🚀 ~ file: index.ts ~ process.env.NODE_ENV', process.env.NODE_ENV);
console.log('🚀 ~ file: index.ts ~ config', config);
