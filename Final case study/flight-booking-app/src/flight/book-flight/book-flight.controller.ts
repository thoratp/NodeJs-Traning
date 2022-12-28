import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { BookingDTO } from '../dto/booking.dto';
import { FlightService } from '../flight.service';
@Controller('app/v1/flight/booking')
export class BookFlightController {
    constructor(private flightService: FlightService) {

    }
    @Post()
    async bookFlight(@Body() booking: BookingDTO) {
        console.log(JSON.stringify(booking))
        try {
            return this.flightService.bookFlight(booking)
        } catch (e) {
            throw new Error('Error occured while booking flight')
        }
    }

    @Get('history/:emailId')
    async getBookingHistory(@Param('emailId') emailId: string) {
        try {
            return this.flightService.getBookingHistory(emailId)
        } catch (e) {
            throw new Error('Error occured while getting booked ticket history')
        }
    }

}
