import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  validate(username: string, password: string): any {
    const user = this._authService.validateUser(username, password);
    if (!!user) {
        return user;  
    }
    throw new UnauthorizedException("User is not valid");
  }
}