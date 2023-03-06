import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from 'src/api/account/account.module';
import { MessageModule } from 'src/api/message/message.module';
import { TopicModule } from 'src/api/topic/topic.module';
import { MailModule } from 'src/mail/mail.module';
import { AppGateway } from './app.gateway';
import { SocketService } from './socket.service';

@Global()
@Module({
  imports: [
    AccountModule,
    TopicModule,
    MessageModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('jwt.secretKey'),
          signOptions: {
            expiresIn: config.get('jwt.expireIns'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppGateway, SocketService],
  exports: [SocketService],
})
export class GatewayModule {}
