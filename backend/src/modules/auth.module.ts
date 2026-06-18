import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/service/auth.service';
import { User } from './user.model';
import { Purchase } from './purchase.model';
import { AuthController } from 'src/controller/auth.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Purchase]),
    JwtModule.register({
      secret: 'segredoSuperSecreto',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}