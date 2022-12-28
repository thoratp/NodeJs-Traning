import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AirlineEntity } from "../../airline/entities/airline.entity";
@Entity('flight')
export class FlightEntity {

    @PrimaryGeneratedColumn()
    id:number

    @IsNumber()
    @Column()
    flight_number:number

    @IsNotEmpty()
    @Column()
    from_place:string

    @IsNotEmpty()
    @Column()
    to_place:string

    @IsNotEmpty()
    @Column()
    start_time:string

    @IsNotEmpty()
    @Column()
    end_time:string

    @IsNotEmpty()
    @Column()
    total_number_of_business_class_seats:string

    @IsNotEmpty()
    @Column()
    total_number_of_nonbusiness_class_seats:string

    @IsNotEmpty()
    @Column()
    ticket_cost:string
    
    @IsNotEmpty()
    @Column()
    total_number_of_seats:string

    @IsNotEmpty()
    @Column()
    meal:string
   
    @IsNotEmpty()
    @ManyToOne(type=>AirlineEntity,airline=>airline.id,{
        nullable: true,
        cascade: true,
    })
    airline_id:AirlineEntity

}
