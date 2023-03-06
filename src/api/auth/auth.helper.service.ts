import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { ERROR_CODE, IConfigJwt, IConfigRedis } from 'src/common/interfaces';
import { Generate } from 'src/common/utils/generate.utils';
import { JWTUtils } from 'src/common/utils/jwt.utils';
import { Security } from 'src/common/utils/security.utils';
import { Account } from 'src/entities/account.entity';
import { MailService } from 'src/mail/mail.service';
import { AppException } from 'src/middleware';
import { AccountStatus } from '../account/account.interface';

@Injectable()
export class AuthHelper {
  private readonly jwt: IConfigJwt;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwt = this.configService.get('jwt');
  }

  generateOtpConfirmAndSendMail = async (account: Account) => {
    const otpRegister = Generate.otp();
    await this.cacheManager.set(Generate.keyRegister(account.id, account.username), otpRegister, {
      ttl: this.configService.get<IConfigRedis>('redis').ttlOtp,
    });
    await this.mailService.sendOtpRegister(account, otpRegister);
  };

  generateOtpForgotPasswordAndSendMail = async (account: Account) => {
    const otpRegister = Generate.otp();
    await this.cacheManager.set(Generate.keyForgotPassword(account.id, account.username), otpRegister, {
      ttl: this.configService.get<IConfigRedis>('redis').ttlOtp,
    });
    await this.mailService.sendOtpForgotPassword(account, otpRegister);
  };

  verifyOtpRegister = async (account: Account, otp: string) => {
    await this.verifyOtp(Generate.keyRegister(account.id, account.username), otp);
  };

  verifyOtpForgotPassword = async (account: Account, otp: string) => {
    await this.verifyOtp(Generate.keyForgotPassword(account.id, account.username), otp);
  };

  verifyOtp = async (key, otp) => {
    const otpRedis = await this.cacheManager.get(key);
    if (!otpRedis) {
      return new AppException(ERROR_CODE.AUTH_NOT_FOUND_OTP);
    }
    if (otpRedis.toString() !== otp) {
      throw new AppException(ERROR_CODE.AUTH_OTP_NOT_MATCH);
    }
  };

  signJWT = (account: Account) => {
    const accountJWT = JWTUtils.generateAuthToken(account);
    return this.jwtService.sign(accountJWT, { expiresIn: this.jwt.expireIns });
  };

  destroyJWT = () => {};

  isMatchPassword = async (account: Account, password) => {
    const isMatchPassword = await Security.compareBcrypt(password, account.password);
    if (!isMatchPassword) throw new AppException(ERROR_CODE.AUTH_PASSWORD_INCORRECT);
  };

  checkUserStatusLogin = async (account: Account) => {
    // if sign but account not verify
    if (account.status === AccountStatus.NOT_VERIFY) {
      await this.generateOtpConfirmAndSendMail(account);
      throw new AppException(ERROR_CODE.ACCOUNT_NOT_VERIFIED);
    }
    // if account status is inactive
    if (account.status === AccountStatus.INACTIVE) {
      throw new AppException(ERROR_CODE.ACCOUNT_INACTIVE);
    }
  };

  isExistEmailOrUsername = (account: Account) => {
    if (!!account?.email || !!account?.username) {
      throw new AppException(ERROR_CODE.ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER);
    }
  };

  updatedAccountResetPassword = async (account: Account, password: string) => {
    if (account.status === AccountStatus.NOT_VERIFY) {
      account.status = AccountStatus.ACTIVE;
    }
    account.password = await Security.hashBcrypt(password);
    await account.save();
  };
}
