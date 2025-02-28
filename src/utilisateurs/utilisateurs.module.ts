// utilisateurs/utilisateurs.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Utilisateur, UtilisateurSchema } from './utilisateur.schema';
import { UtilisateursService } from './utilisateursService';
import { UtilisateursController } from './utilisateurs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Utilisateur.name, schema: UtilisateurSchema }])],
  providers: [UtilisateursService],
  controllers: [UtilisateursController],
})
export class UtilisateursModule {}