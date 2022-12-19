import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({name: "director_name"})
  director: string;

  @Column({ precision:4.9, default: 0.0 })
  rating: number;
}