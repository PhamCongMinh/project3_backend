import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@modules/auth/auth.service';
import { AuthController } from '@modules/auth/auth.controller';
import UserRepository from '@models/repositories/User.repository';
import { JwtStrategy } from '@shared/strategy/jwt.strategy';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@models/entities/User.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
