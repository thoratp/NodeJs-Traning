import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flight/entities/flight.entity";
@Entity('airline')
export class AirlineEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string;

    @Column({ default: "no" })
    blocked?: string;

    @OneToMany(type => FlightEntity, flight => flight.airline_id)
    flights: FlightEntity[]
}

