import { Injectable } from '@nestjs/common';
import { Security } from 'src/common/utils/security.utils';
import { AccountHelper } from '../account/account.helper.service';
import { AccountStatus } from '../account/account.interface';
import {
  AuthForgotPasswordDto,
  AuthResetPassword,
  AuthSignInDto,
  AuthSignOutDto,
  AuthSignUpDto,
  AuthVerifyAccountDto,
} from './auth.dto';
import { AuthHelper } from './auth.helper.service';
@Injectable()
export class AuthService {
  constructor(private readonly accountHelper: AccountHelper, private readonly authHelper: AuthHelper) {}

  async signUp(body: AuthSignUpDto) {
    const { email, username, fullName } = body;
    // check exist
    const findAccount = await this.accountHelper.findAccountWhere([{ email }, { username }]);
    this.authHelper.isExistEmailOrUsername(findAccount);
    // hash password
    const password = await Security.hashBcrypt(body.password);
    // create account, send mail and return account
    const account = await this.accountHelper.insertAccount({ email, username, password, fullName });
    await this.authHelper.generateOtpConfirmAndSendMail(account);
    return account;
  }

  async signIn(body: AuthSignInDto) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccount(account);
    // check password
    await this.authHelper.isMatchPassword(account, body.password);
    // check user status
    await this.authHelper.checkUserStatusLogin(account);
    // return jwt
    return { token: this.authHelper.signJWT(account) };
  }

  async verifyAccount(body: AuthVerifyAccountDto) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccount(account);
    this.accountHelper.isAccountNotVerify(account);
    // check otp
    await this.authHelper.verifyOtpRegister(account, body.otp);
    // update user and return jwt
    account.status = AccountStatus.ACTIVE;
    await account.save();
    return { token: this.authHelper.signJWT(account) };
  }

  async forgotPassword(body: AuthForgotPasswordDto) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccount(account);
    await this.authHelper.generateOtpForgotPasswordAndSendMail(account);
    return { result: true };
  }

  async resetPassword(body: AuthResetPassword) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccount(account);
    // check otp
    await this.authHelper.verifyOtpForgotPassword(account, body.otp);
    await this.authHelper.updatedAccountResetPassword(account, body.password);
    return { result: true };
  }

  async signOut(body: AuthSignOutDto) {
    this.authHelper.destroyJWT();
    return { result: true };
  }
}
