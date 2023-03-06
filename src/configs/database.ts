import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Env, IConfigDatabase } from 'src/common/interfaces/config.interface';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    this.logger.info(
      `database config ${JSON.stringify(this.configService.get('database'))}`,
    );
    return {
      ...this.configService.get<IConfigDatabase>('database'),
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === Env.DEFAULT,
      entities: ['dist/**/*.entity.{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
      // extra: {
      //   // based on https://node-postgres.com/api/pool
      //   // max connection pool size
      //   max: this.configService.get('database.maxConnections'),
      //   ssl: this.configService.get('database.sslEnabled')
      //     ? {
      //         rejectUnauthorized: this.configService.get('database.rejectUnauthorized'),
      //         ca: this.configService.get('database.ca')
      //           ? this.configService.get('database.ca')
      //           : undefined,
      //         key: this.configService.get('database.key')
      //           ? this.configService.get('database.key')
      //           : undefined,
      //         cert: this.configService.get('database.cert')
      //           ? this.configService.get('database.cert')
      //           : undefined,
      //       }
      //     : undefined,
      // },
    };
  }
}
