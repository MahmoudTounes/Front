// src/users/models/user.model.ts
import { Schema, model, Document } from 'mongoose';
import { User } from './interfaces/user.interface';

const ExperienceSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  description: { type: String, required: false },
});

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: false },
  birthDate: { type: Date, required: false },
  country: { type: String, required: false },
  studyLevel: { type: String, required: false },
  experiences: [{ type: ExperienceSchema, required: false }], // Add the experiences array with its schema
});

export const UserModel = model<User>('User', UserSchema);