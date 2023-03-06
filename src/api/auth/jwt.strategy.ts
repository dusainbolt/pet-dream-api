import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AccountHelper } from '../account/account.helper.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly accountHelper: AccountHelper) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication || request?.headers?.authorization?.split(`Bearer `)[1],
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.secretKey'),
    } as StrategyOptions);
  }

  async validate(payload: any) {
    const user = await this.accountHelper.findAccount({ id: payload.id });
    return user;
  }
}
