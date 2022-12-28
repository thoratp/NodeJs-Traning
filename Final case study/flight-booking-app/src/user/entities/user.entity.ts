import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('user')
export class UserEntity{
    @PrimaryColumn()
    email: string;
    
    @Column()
    username: string;

    @Column()
    password: string;
}

