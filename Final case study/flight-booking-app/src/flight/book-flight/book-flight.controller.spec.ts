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
      }), TypeOrmModule.forFeature([FlightEntity, BookingEntity, PassengerEntity, AirlineEntity])],
      providers: [FlightService],

    }).compile();

    controller = module.get<BookFlightController>(BookFlightController);
    flightService = module.get<FlightService>(FlightService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call book flight ', async () => {
    const result: Promise<BookingEntity> = new Promise((resolve, reject) => {
      const m = new BookingEntity();
      m.flight_id = 2;
      m.booked_by = "admin";
      m.emailId = "admin@gmail.com";
      m.number_of_seats = '5000';
      m.passengers = [];
      m.selected_seat_number = 'veg';
      m.selected_meal = null;

      resolve(m);
    });
    jest.spyOn(flightService, 'bookFlight').mockImplementation((booking: BookingEntity) => result);

    let booking: BookingEntity = await controller.bookFlight({
        "flight_id": 215,
        "booked_by": "mahesh",
        "emailId": "mahesh@gmail.com",
        "number_of_seats": '2',
        "passengers": [],
        "selected_meal": "veg",
        "selected_seat_number": null
    });
});

it('should call getHistory by email ', async () => {
  const email = 'admin@gmail.com'
  controller.getBookingHistory(email)
  const result: Promise<BookingEntity[]> = new Promise((resolve, reject) => {
    resolve([])
  });
  jest.spyOn(flightService, 'getBookingHistory').mockImplementation(() => result)

});
});
