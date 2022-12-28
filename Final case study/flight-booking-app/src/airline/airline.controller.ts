import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AirlineService } from './airline.service';
import { AirlineDTO } from './dto/airline.dto';
@Controller('app/v1/airline')
export class AirlineController {
    constructor(private airlineService: AirlineService) { }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async addAirline(@Body() airline: AirlineDTO) {
        try {

            let savedAirline = this.airlineService.createAirline(airline)
            return savedAirline;
        } catch (e) {
            throw new Error('Error occured while saving airline')
        }
    }
    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateAirline(@Param('id') id: number, @Body() airline: AirlineDTO) {
        try {

            let updateAirline = this.airlineService.updateAirline(id, airline)
            return updateAirline;
        } catch (e) {
            throw new Error('Error occured while updating airline')
        }
    }


}
