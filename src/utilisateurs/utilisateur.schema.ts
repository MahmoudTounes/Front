// utilisateurs/utilisateur.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Utilisateur extends Document {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ type: String })
  educationLevel: string;

  @Prop({ type: [String] })
  skills: string[];

  @Prop({ type: [Types.ObjectId], ref: 'Course' }) // Assurez-vous d'avoir un modèle Course
  enrolledCourses: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Course' }) // Assurez-vous d'avoir un modèle Course
  completedCourses: Types.ObjectId[];

  @Prop({ type: String })
  role: string;

  @Prop({ type: Date, default: Date.now })
  registrationDate: Date;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop({ type: String, default: 'active' })
  status: string;

    @Prop()
  age: number;
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);