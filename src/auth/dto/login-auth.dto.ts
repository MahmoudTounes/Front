import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { AccountType } from './register-auth.dto';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  accountType: AccountType;
}