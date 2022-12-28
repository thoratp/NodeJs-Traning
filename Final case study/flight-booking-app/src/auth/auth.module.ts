import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../util/constant/jwt.constant';
import { LocalStrategy } from '../util/strategy/local.strategy';
import { JwtStrategy } from '../util/strategy/jwt.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthModule,AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
