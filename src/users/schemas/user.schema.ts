// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

class Experience {
  @Prop()
  title: string;

  @Prop()
  company: string;

  @Prop()
  startDate: Date;

  @Prop({ required: false })
  endDate?: Date;

  @Prop()
  description: string;
}

@Schema()
export class User {
  @Prop()
  accountType: string;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  birthDate: Date;

  @Prop()
  country: string;

  @Prop()
  studyLevel: string;

  @Prop({ type: [Experience] })
  experiences: Experience[];
}

export const UserSchema = SchemaFactory.createForClass(User);