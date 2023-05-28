import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  phoneNo: string;

  @IsNotEmpty()
  password: string;
}
