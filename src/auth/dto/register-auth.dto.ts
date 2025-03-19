// src/auth/dto/register-auth.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsDate, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export enum AccountType {
    PROFESSEUR = 'professeur',
    ELEVE = 'eleve',
  }
class ExperienceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsString()
  description: string;
}

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  accountType: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  studyLevel: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences: ExperienceDto[];
}