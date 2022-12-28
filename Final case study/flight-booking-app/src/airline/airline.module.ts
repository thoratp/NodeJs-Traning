import { Module } from '@nestjs/common';
import { AirlineController } from './airline.controller';
import { AirlineService } from './airline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from './entities/airline.entity';
import { FlightEntity } from '../flight/entities/flight.entity';


@Module({
  imports:[TypeOrmModule.forFeature([AirlineEntity,FlightEntity])],
  controllers: [AirlineController],
  providers: [AirlineService],
  exports:[AirlineModule]
})
export class AirlineModule {}
