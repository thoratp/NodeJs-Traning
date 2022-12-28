import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { BookFlightController } from './book-flight/book-flight.controller';
import { AirlineEntity } from '../airline/entities/airline.entity';
import { BookingEntity } from './entities/booking.entity';
import { FlightEntity } from './entities/flight.entity';
import { PassengerEntity } from './entities/passenger.entity';


@Module({
  imports:[TypeOrmModule.forFeature([FlightEntity,AirlineEntity,BookingEntity,PassengerEntity])],
  controllers: [FlightController, BookFlightController],
  providers: [FlightService],
  exports: [FlightModule]

})
export class FlightModule {}
