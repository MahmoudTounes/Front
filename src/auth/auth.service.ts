// src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto): Promise<User> {
    const { email, password, ...userData } = registerDto;

    // Vérifier si l'utilisateur avec cet email existe déjà
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.');
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
    return await newUser.save();
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{ access_token: string }> {
    const { email, password } = loginAuthDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { sub: user._id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}