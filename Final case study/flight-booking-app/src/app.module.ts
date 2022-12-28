import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineModule } from './airline/airline.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'flight_booking',
    autoLoadEntities: true,
    entities: [],
    synchronize: true,
  }), AirlineModule, FlightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
