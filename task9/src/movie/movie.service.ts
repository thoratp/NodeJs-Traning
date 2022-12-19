import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) { }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findById(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id });
  }

  findByTitle(title: string): Promise<Movie> {
    return this.moviesRepository.findOneBy({ title:title });
  }

  async remove(id: string | number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  createMovie(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save(movie);
  }

  async updateMovie(movie: Movie, id: number): Promise<void> {
    this.moviesRepository.update(id,
      movie);
  }


}
