// src/users/dto/create-user.dto.ts
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber, IsDate, IsEnum } from 'class-validator';
import { AccountType } from '../../auth/dto/register-auth.dto'; // Import AccountType si vous l'utilisez ici

export class CreateUserDto {
  @IsOptional() // Rendre username optionnel
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  studyLevel?: string;

  @IsOptional()
  experiences?: any[];

  @IsNotEmpty()
  @IsEnum(AccountType)
  accountType: AccountType;
}