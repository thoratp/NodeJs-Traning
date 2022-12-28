import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async validateUser(username, password): Promise<any> {
        const validUser = await this.userService.findByUsername(username);
        if (validUser && validUser.password === password) {
            const { password, ...result } = validUser;
            return result;
        }
        throw new UnauthorizedException("User is not valid");
    }

    generateToken(user: UserDTO): any {
        const { username, email, password } = user;
        const payload = { username, email, password };
        const token = this.jwtService.sign(payload);
        return { token: token };
    }
}
