// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}