import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './api/account/account.module';
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { Log } from './entities/log.entity';
import { SharedModule } from './shared/shared.module';
import { TopicModule } from './api/topic/topic.module';
import { SeedingModule } from './seeding/seeding.module';
import { MessageModule } from './api/message/message.module';
import { GatewayModule } from './gatewaies/gateway.module';

@Module({
  imports: [
    // Service module
    SharedModule,
    SeedingModule,
    GatewayModule,
    // Entity module
    TypeOrmModule.forFeature([Log]),
    AccountModule,
    AuthModule,
    TopicModule,
    MessageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
