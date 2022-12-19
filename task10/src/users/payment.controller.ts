import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { paybillDTO } from './dto/paybill.dto';
import { UsersService } from './users.service';

@Controller('paymentController')
export class PaymentController {
    constructor(private userService: UsersService) {

    }

    @Get('/ebills/:electricityBill')
    @UseGuards(AuthGuard('jwt'))
    async payElectricityBill(@Body() paybillUser: paybillDTO, @Param('electricityBill') electricityBill: number) {
        try {
            await this.userService.payElectricitybill(paybillUser, electricityBill);
            return `you have paid electricity bill worth Rs. ${electricityBill}-/`
        } catch (e) {
            throw new Error(e);
        }
    }

    @Get('/pbills/:phoneBill')
    @UseGuards(AuthGuard('jwt'))
    async payPhoneBill(@Body() paybillUser: paybillDTO, @Param('phoneBill') phoneBill: number) {
        try {
            await this.userService.payPhonebill(paybillUser, phoneBill);
            return `you have paid phone bill worth Rs. ${phoneBill}-/`
        } catch (e) {
            throw new Error(e);
        }
    }

    @Get('/bills/:electricityBill/:phoneBill')
    @UseGuards(AuthGuard('jwt'))
    async payElectricityAndPhoneBill(@Body() paybillUser: paybillDTO,@Param('electricityBill') electricityBill: number, @Param('phoneBill') phoneBill: number) {
        try {
            await this.userService.payElectricityAndPhoneBill(paybillUser,electricityBill, phoneBill);
            return `you have paid electricity worth Rs. ${electricityBill}-/ and phone bill worth Rs. ${phoneBill}-/`
        } catch (e) {
            throw new Error(e);
        }
    }

}
