import {  Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('app/v1/admin')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("/login")
    @UseGuards(AuthGuard("local"))
    async getLogin(@Req() req: Request) {
        return this.authService.generateToken(req['user']);
    }
}
