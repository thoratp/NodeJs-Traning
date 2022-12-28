import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from '../airline/entities/airline.entity';
import { BookingEntity } from './entities/booking.entity';
import { FlightEntity } from './entities/flight.entity';
import { PassengerEntity } from './entities/passenger.entity';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

describe('FlightController', () => {
  let controller: FlightController;
  let flightService: FlightService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [FlightService],
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
      }), TypeOrmModule.forFeature([FlightEntity, BookingEntity, PassengerEntity,AirlineEntity])]
    }).compile();

    controller = module.get<FlightController>(FlightController);
    flightService = module.get<FlightService>(FlightService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create flight ', async () => {
    const result: Promise<FlightEntity> = new Promise((resolve, reject) => {
      const m = new FlightEntity();
      m.flight_number=1,
      m.from_place="delhi",
      m.to_place="pune",
      m.start_time="10:35",
      m.end_time="13:45",
      m.total_number_of_business_class_seats="50",
      m.total_number_of_nonbusiness_class_seats="50",
      m.ticket_cost="5000",
      m.total_number_of_seats="100",
      m.meal="veg"
      

      resolve(m);
    });
    jest.spyOn(flightService, 'createFlight').mockImplementation((flight: FlightEntity) => result);

    let flight: FlightEntity = await controller.createFlight({
        "flight_number":1,
        "airline_id":21,
        "from_place":"delhi",
        "to_place":"pune",
        "start_time":"10:35",
        "end_time":"13:45",
        "total_number_of_business_class_seats":"50",
        "total_number_of_nonbusiness_class_seats":"50",
        "ticket_cost":"5000",
        "total_number_of_seats":"100",
        "meal":"veg"
    });
});
});
