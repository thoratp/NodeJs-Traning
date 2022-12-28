import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from '../airline/entities/airline.entity';
import { Repository } from 'typeorm';
import { BookingDTO } from './dto/booking.dto';
import { FlightDTO } from './dto/flight.dto';
import { SearchDTO } from './dto/search.dto';
import { BookingEntity } from './entities/booking.entity';
import { FlightEntity } from './entities/flight.entity';

@Injectable()
export class FlightService {

    constructor(
        @InjectRepository(FlightEntity)
        private flightRepository: Repository<FlightEntity>,
        @InjectRepository(BookingEntity)
        private bookingRepository: Repository<BookingEntity>
    ) {

    }

    async createFlight(flight: FlightDTO): Promise<FlightEntity> {
        return await this.flightRepository.save(flight)
    }

    async searchFlight(search: SearchDTO): Promise<FlightEntity[]> {
        return await this.flightRepository.createQueryBuilder("flight").leftJoinAndSelect(AirlineEntity, 'airline', 'flight.airlineIdId = airline.id')
            .where(
                'flight.from_place= :from_place', { from_place: search.from_place }
            ).andWhere(
                'flight.to_place= :to_place', { to_place: search.to_place }
            ).andWhere(
                'airline.blocked= :blocked', { blocked: 'no' }
            )
            .getMany();
    }

    async bookFlight(booking: BookingDTO): Promise<BookingEntity> {
        return await this.bookingRepository.save(booking)
    }

    async getBookingHistory(emailId: string): Promise<BookingEntity[]> {
        return await this.bookingRepository.find(
            {
                where: { emailId: emailId },
                relations: {
                    passengers: true
                }
            })
    }
    async getTicketDetails(pnr: number): Promise<BookingEntity[]> {
        return await this.bookingRepository.find(
            {
                where: { pnr: pnr },
                relations: {
                    passengers: true
                }
            })
    }
    async cancelTicket(pnr: number): Promise<any> {
        return await this.bookingRepository.update(pnr, { status: 'Inactive' })
    }

}
