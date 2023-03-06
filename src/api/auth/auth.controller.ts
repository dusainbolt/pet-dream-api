import { Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import {
  AuthForgotPasswordDto,
  AuthResetPassword,
  AuthSignInDto,
  AuthSignOutDto,
  AuthSignUpDto,
  AuthVerifyAccountDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@IsAuthController(ENTITY_NAME.AUTH, 'Authentications', false)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Register new account' })
  async signUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Login to system' })
  async signIn(@Body() body: AuthSignInDto) {
    return this.authService.signIn(body);
  }

  @Post('/verify-account')
  @ApiOperation({ summary: 'Verify otp account after register' })
  async verifyAccount(@Body() body: AuthVerifyAccountDto) {
    return this.authService.verifyAccount(body);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Request forgot password that create otp and new password flow' })
  async forgotPassword(@Body() body: AuthForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('/reset-password-otp')
  @ApiOperation({ summary: 'Request verify otp and reset password' })
  async resetPassword(@Body() body: AuthResetPassword) {
    return this.authService.resetPassword(body);
  }

  @Post('/sign-out')
  @ApiOperation({ summary: 'Logout to system' })
  async signOut(@Body() body: AuthSignOutDto) {
    return this.authService.signOut(body);
  }
}
