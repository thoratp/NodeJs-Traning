import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingEntity } from "./booking.entity";
@Entity('passenger')
export class PassengerEntity {
    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @Column()
    name:string;

    @IsNotEmpty()
    @Column()
    gender:string;

    @IsNotEmpty()
    @Column()
    age:number;

    @IsNotEmpty()
    @ManyToMany(type=>BookingEntity,booking =>booking.passengers)
    bookings:BookingEntity[]
}
