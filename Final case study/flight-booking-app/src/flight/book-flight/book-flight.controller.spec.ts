import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from '../../airline/entities/airline.entity';
import { BookingEntity } from '../entities/booking.entity';
import { FlightEntity } from '../entities/flight.entity';
import { PassengerEntity } from '../entities/passenger.entity';
import { FlightService } from '../flight.service';
import { BookFlightController } from './book-flight.controller';

describe('BookFlightController', () => {
  let controller: BookFlightController;
  let flightService: FlightService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookFlightController],
      imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'flight_booking',
        autoLoadEntities: true,
        entities: [],
        synchronize: true,
      }), TypeOrmModule.forFeature([FlightEntity, BookingEntity, PassengerEntity,AirlineEntity])],
      providers: [FlightService],

    }).compile();

    controller = module.get<BookFlightController>(BookFlightController);
    flightService = module.get<FlightService>(FlightService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
