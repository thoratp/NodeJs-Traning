import { Controller, Body, Post, Get, Param, Put, Response, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { FlightDTO } from './dto/flight.dto';
import { SearchDTO } from './dto/search.dto';
import { FlightService } from './flight.service';
@Controller('app/v1/flight/')
export class FlightController {
    constructor(private flightService: FlightService) {

    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createFlight(@Body() flight: FlightDTO) {
        console.log(JSON.stringify(flight))
        try {
            return this.flightService.createFlight(flight)
        } catch (e) {
            throw new Error('Error occured while creating flight')
        }
    }

    @Get('/search')
    async searchFlight(@Body() search: SearchDTO) {
        try {
            return this.flightService.searchFlight(search)
        } catch (e) {
            throw new Error('Error occured while searching flight')
        }
    }


    @Get('ticket/:pnr')
    async getTicketDetails(@Param('pnr') pnr: number) {
        try {
            return this.flightService.getTicketDetails(pnr)
        } catch (e) {
            throw new Error('Error occured while getting ticket details')
        }
    }


    @Put('booking/cancel/:pnr')
    async cancelTicket(@Param('pnr') pnr: number, @Response() res) {
        try {
            await this.flightService.cancelTicket(pnr);
            res.status(HttpStatus.NO_CONTENT).send()
        } catch (e) {
            throw new Error('Error occured while canceling ticket')
        }
    }


}
