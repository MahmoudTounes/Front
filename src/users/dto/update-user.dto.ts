// src/users/dto/update-user.dto.ts
import { IsOptional, IsString, IsEmail, IsNumber, IsDate } from 'class-validator';

export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

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
  experiences?: UpdateExperienceDto[]; // Add experiences to the update DTO
}