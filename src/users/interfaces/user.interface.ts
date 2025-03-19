// src/users/interfaces/user.interface.ts
import { Document } from 'mongoose';

export enum AccountType {
  PROFESSEUR = 'professeur',
  ELEVE = 'eleve',
}

export interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface User extends Document {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  birthDate?: Date;
  country?: string;
  studyLevel?: string;
  experiences?: Experience[];
  accountType: AccountType; // Ajouter accountType à l'interface
}
