import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async validateUser(username,password): Promise<any> {
        const validUser = await this.usersService.findByUsername(username);
        if (validUser && validUser.password === password) {
            const { password, ...result } = validUser;
            return result;
        }
        return null;
    }

    generateToken(user:User):any{
        const {username, email, password,balance} = user;
        const payload = {username, email, password,balance};
        const token = this.jwtService.sign(payload);
        return {token: token};
    }
}
