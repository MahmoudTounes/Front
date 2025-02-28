// utilisateurs/utilisateurs.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UtilisateursService } from './utilisateursService';
import { Utilisateur } from './utilisateur.schema';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private utilisateursService: UtilisateursService) {}

  @Post()
  async create(@Body() utilisateur: Utilisateur): Promise<Utilisateur> {
    return this.utilisateursService.create(utilisateur);
  }

  @Get()
  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateursService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Utilisateur> {
    return this.utilisateursService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() utilisateur: Utilisateur): Promise<Utilisateur> {
    return this.utilisateursService.update(id, utilisateur);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Utilisateur> {
    return this.utilisateursService.delete(id);
  }
}