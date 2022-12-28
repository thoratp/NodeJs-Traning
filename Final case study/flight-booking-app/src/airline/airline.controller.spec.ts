import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from '../flight/entities/flight.entity';
import { AirlineController } from './airline.controller';
import { AirlineService } from './airline.service';
import { AirlineEntity } from './entities/airline.entity';

describe('AirlineController', () => {
  let controller: AirlineController;
  let airlineService: AirlineService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirlineController],
      providers: [AirlineService],
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
      }), TypeOrmModule.forFeature([AirlineEntity, FlightEntity])]
    }).compile();

    controller = module.get<AirlineController>(AirlineController);
    airlineService = module.get<AirlineService>(AirlineService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create  airline ', async () => {
    const result: Promise<AirlineEntity> = new Promise((resolve, reject) => {
      const m = new AirlineEntity();
      m.name = 'Indigo';
      resolve(m);
    });
    jest.spyOn(airlineService, 'createAirline').mockImplementation((airline: AirlineEntity) => result);

    let airline: AirlineEntity = await controller.addAirline({
      name: 'Indigo'
    });
  });

  it('should call update  airline ', async () => {
    const result: Promise<AirlineEntity> = new Promise((resolve, reject) => {
      const m = new AirlineEntity();
      m.name = 'Indigo';
      m.id = 1;
      m.blocked = 'no'
      resolve(m);
    });
    jest.spyOn(airlineService, 'updateAirline').mockImplementation((id: number, airline: AirlineEntity) => result);

    let airline: AirlineEntity = await controller.updateAirline(1, {
      name: 'Indigo',
      id: 1,
      blocked: 'no'
    });
  });
});
