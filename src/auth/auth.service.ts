import { Injectable, ConflictException, InternalServerErrorException, Logger, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto): Promise<User> {
    const { email, password, ...userData } = registerDto;

    try {
      // Vérifier si l'utilisateur avec cet email existe déjà
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new ConflictException('Cet email est déjà utilisé.');
      }

      // Valider les données reçues
      if (!email || !password || !userData) {
        throw new BadRequestException('Données d\'inscription incomplètes.');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer une nouvelle instance du modèle User
      const newUser = new this.userModel({
        email,
        password: hashedPassword,
        ...userData,
      });

      // Enregistrer le nouvel utilisateur dans la base de données et le retourner
      const savedUser = await newUser.save();
      return savedUser; // Retourner l'utilisateur enregistré
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error; // Relancer les exceptions spécifiques
      }
      this.logger.error(`Erreur lors de l'enregistrement de l'utilisateur: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Erreur lors de l\'enregistrement de l\'utilisateur.');
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{ access_token: string }> {
    const { email, password } = loginAuthDto;

    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      // Créer le payload pour le JWT
      const payload = { sub: user._id, email: user.email };

      // Générer le JWT
      const access_token = await this.jwtService.signAsync(payload);

      // Retourner le JWT
      return { access_token };
    } catch (error) {
      this.logger.error(`Erreur lors de la connexion de l'utilisateur: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Erreur lors de la connexion de l\'utilisateur.');
    }
  }
}