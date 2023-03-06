import { IsEmail } from 'class-validator';
import { IsSwaggerString } from 'src/common/decorators';

export class AuthSignUpDto {
  @IsSwaggerString({ default: 'dulh181199@gmail.com' })
  @IsEmail()
  email: string;

  @IsSwaggerString({ default: 'dusainbolt' })
  username: string;

  @IsSwaggerString({ default: 'du@dev1234' })
  password: string;

  @IsSwaggerString({ default: 'Lê Huy Du' })
  fullName: string;
}

export class AuthSignInDto {
  @IsSwaggerString({ default: 'dulh181199@gmail.com' })
  credential: string;

  @IsSwaggerString({ default: 'du@dev1234' })
  password: string;
}

export class AuthVerifyAccountDto {
  @IsSwaggerString({ default: '181199', maxLength: 6, minLength: 6 })
  otp: string;

  @IsSwaggerString({ default: 'dulh181199@gmail.com' })
  credential: string;
}

export class AuthForgotPasswordDto {
  @IsSwaggerString({ default: 'dulh181199@gmail.com' })
  credential: string;
}

export class AuthResetPassword {
  @IsSwaggerString({ default: 'dulh181199@gmail.com' })
  credential: string;

  @IsSwaggerString({ default: '250502', maxLength: 6, minLength: 6 })
  otp: string;

  @IsSwaggerString({ default: 'du@dev1234' })
  password: string;
}

export class AuthSignOutDto {
  @IsSwaggerString({ default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string;
}
