import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from '../flight/entities/flight.entity';
import { AirlineService } from './airline.service';
import { AirlineEntity } from './entities/airline.entity';

describe('AirlineService', () => {
  let service: AirlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      }), TypeOrmModule.forFeature([AirlineEntity,FlightEntity])],
      providers: [AirlineService]
    }).compile();

    service = module.get<AirlineService>(AirlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
