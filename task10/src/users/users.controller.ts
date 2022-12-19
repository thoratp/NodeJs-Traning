import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { changepassDTO } from './dto/changePass.dto';
import { forgotPassDTO } from './dto/forgotPassword.dto';
import { creditAmountDto } from './dto/creditAmount.dto';

@Controller('app/users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Get()
    async getUsers() {
        try {
            const allUsers = await this.userService.getUsers();
            return allUsers;
        } catch (e) {
            throw new Error(e);
        }
    }


    @Post()
    async saveUser(@Body() user: User) {
        try {
            const savedUser = await this.userService.createUser(user);
            return savedUser;
        } catch (e) {
            throw new Error(e);
        }
    }


    @Post('/changepassword')
    @UseGuards(AuthGuard('jwt'))
    async changePassword(@Body() changePassword: changepassDTO) {
        try {
            const changePasssword = await this.userService.changepassword(changePassword.email, changePassword.oldpassword, changePassword.newpassword);
            return changePasssword;
        } catch (e) {
            throw new Error(e);
        }
    }


    @Post('/forgotpassword')
    async forgotPassword(@Body() forgotPass: forgotPassDTO) {
        try {
            const forgotPasssword = await this.userService.changepassword(forgotPass.email, forgotPass.oldpassword, forgotPass.newpassword);
            return forgotPasssword;
        } catch (e) {
            throw new Error(e);
        }
    }

    @Get('/getBalance/:email')
    @UseGuards(AuthGuard('jwt'))
    async getBalance(@Param('email') email: string) {
        try {
            const availableBalance = await this.userService.getBalance(email);
            return availableBalance;
        } catch (e) {
            throw new Error(e);
        }
    }

    @Put('/creditAmount')
    @UseGuards(AuthGuard('jwt'))
    async creditAmout(@Body()creditAmount:creditAmountDto) {
        try {
            const creditedAmountBalance = await this.userService.creditAmountToUser(creditAmount);
            return creditedAmountBalance;
        } catch (e) {
            throw new Error(e);
        }
    }
}

