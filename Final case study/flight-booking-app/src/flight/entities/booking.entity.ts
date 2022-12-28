import { IsEmail, IsInt, IsNotEmpty, IsNumberString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PassengerEntity } from "./passenger.entity";
@Entity('booking')
export class BookingEntity {
    @IsInt()
    @PrimaryGeneratedColumn()
    pnr?: number;

    @IsNotEmpty()
    @Column()
    flight_id: number;

    @IsNotEmpty()
    @Column()
    booked_by: string;

    @IsEmail()
    @Column()
    emailId: string;

    @Column()
    @IsNotEmpty()
    number_of_seats: string;

    @IsNotEmpty()
    @Column()
    selected_meal: string;

    @Column({ nullable: true })
    selected_seat_number: string;

    @IsNotEmpty()
    @Column({ default: 'Active' })
    status: string;

    @ManyToMany(type => PassengerEntity, passenger => passenger.id, {
        cascade: true
    })
    @JoinTable()
    passengers: PassengerEntity[];

}
