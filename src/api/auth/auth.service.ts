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
    const findAccount = await this.accountHelper.findOne({ where: [{ email }, { username }] });
    this.authHelper.isExistEmailOrUsernameMsg(findAccount);
    // hash password
    const password = await Security.hashBcrypt(body.password);
    // create account, send mail and return account
    const account = await this.accountHelper.store({ email, username, password, fullName });
    await this.authHelper.generateOtpConfirmAndSendMail(account);
    return account;
  }

  async signIn(body: AuthSignInDto) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccountMsg(account);
    // check password
    await this.authHelper.isMatchPasswordMsg(account, body.password);
    // check user status
    await this.authHelper.checkUserStatusLoginMsg(account);
    // return jwt
    return { token: this.authHelper.signJWT(account) };
  }

  async verifyAccount(body: AuthVerifyAccountDto) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccountMsg(account);
    this.accountHelper.isAccountNotVerifyMsg(account);
    // check otp
    await this.authHelper.verifyOtpRegisterMsg(account, body.otp);
    // update user and return jwt
    account.status = AccountStatus.ACTIVE;
    await account.save();
    return { token: this.authHelper.signJWT(account) };
  }

  async forgotPassword(body: AuthForgotPasswordDto) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccountMsg(account);
    await this.authHelper.generateOtpForgotPasswordAndSendMail(account);
    return { result: true };
  }

  async resetPassword(body: AuthResetPassword) {
    const { credential } = body;
    const account = await this.accountHelper.getAccByCredential(credential);
    // check account
    this.accountHelper.isExistAccountMsg(account);
    // check otp
    await this.authHelper.verifyOtpForgotPasswordMsg(account, body.otp);
    await this.authHelper.updatedAccountResetPassword(account, body.password);
    return { result: true };
  }

  async signOut(body: AuthSignOutDto) {
    this.authHelper.destroyJWT();
    return { result: true };
  }
}
