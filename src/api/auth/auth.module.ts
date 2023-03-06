import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { MailModule } from 'src/mail/mail.module';
import { AccountModule } from '../account/account.module';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    AccountModule,
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
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
