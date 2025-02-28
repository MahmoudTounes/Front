// utilisateurs/utilisateurs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utilisateur } from './utilisateur.schema';

@Injectable()
export class UtilisateursService {
  constructor(@InjectModel(Utilisateur.name) private utilisateurModel: Model<Utilisateur>) {}

  async create(utilisateur: Utilisateur): Promise<Utilisateur> {
    const createdUtilisateur = new this.utilisateurModel(utilisateur);
    return createdUtilisateur.save();
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurModel.find().exec();
  }

  async findOne(id: string): Promise<Utilisateur> {
    return this.utilisateurModel.findById(id).exec();
  }

  async update(id: string, utilisateur: Utilisateur): Promise<Utilisateur> {
    return this.utilisateurModel.findByIdAndUpdate(id, utilisateur, { new: true }).exec();
  }

  async delete(id: string): Promise<Utilisateur> {
    return this.utilisateurModel.findByIdAndDelete(id).exec();
  }
}
  