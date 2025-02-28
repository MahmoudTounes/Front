// auth.service.ts
// auth.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly secretKey = 'monSecret';

  generateToken(user) {
    const payload = { userId: user.id, username: user.username };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}