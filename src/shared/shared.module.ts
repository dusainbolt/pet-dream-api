import { CacheModule, CacheStore, Global, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { Env, LogLevel } from 'src/common/interfaces';
import config, { configuration } from 'src/configs';
import { TypeOrmConfigService } from 'src/configs/database';
import { v4 } from 'uuid';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      encoding: 'utf-8',
      envFilePath: [
        process.env.NODE_ENV && process.env.NODE_ENV !== 'default' ? `.env.${process.env.NODE_ENV}` : `.env`,
        `.env`,
      ],
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      // ttl: 600,
    }),

    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: config.redis.host,
      port: config.redis.port,
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => v4(),
        transport:
          process.env.NODE_ENV === Env.DEFAULT ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
        level: process.env.NODE_ENV !== Env.PRODUCTION ? LogLevel.DEBUG : LogLevel.INFO,
        useLevel: process.env.NODE_ENV !== Env.PRODUCTION ? LogLevel.DEBUG : LogLevel.INFO,
        redact: ['payload.user.password'],
      },
      forRoutes: ['*'],
      exclude: [
        { method: RequestMethod.ALL, path: '/v1/healthcheck' },
        { method: RequestMethod.ALL, path: '/api-docs' },
      ],
    }),
  ],
})
export class SharedModule {}
