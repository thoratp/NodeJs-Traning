import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from "./jwt.constant";
import { AuthController } from './auth.controller';
@Module({
  imports: [
    UsersModule,
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,JwtStrategy,LocalStrategy],
  exports: [AuthModule,AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  
}
