import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class User {
  
    @PrimaryColumn()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    balance: Number;
}

