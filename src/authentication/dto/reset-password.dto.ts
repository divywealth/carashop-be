import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  verificationCode: string;
}

export class ForgetPasswordDto {
  @IsEmail()
  email: string;

  verificationCode: string;

  password: string;
}
