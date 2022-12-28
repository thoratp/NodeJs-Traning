import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirlineDTO } from './dto/airline.dto';
import { AirlineEntity } from './entities/airline.entity';

@Injectable()
export class AirlineService {
    constructor(@InjectRepository(AirlineEntity) private airlineRepository: Repository<AirlineEntity>) {

    }
    async createAirline(airline: AirlineDTO): Promise<AirlineEntity> {
        return await this.airlineRepository.save(airline)
    }

    async updateAirline(id: number, airline: AirlineDTO): Promise<any> {
        return this.airlineRepository.update(id, { name: airline.name, blocked: airline.blocked })
    }
}
