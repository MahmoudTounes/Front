// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service'; // Importez votre service d'authentification

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'monSecret', // Votre clé secrète (à remplacer)
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username }; // Retourne les informations de l'utilisateur
  }
}