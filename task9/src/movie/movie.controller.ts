import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';

@Controller('app/movies')
export class MovieController {

    constructor(private movieService: MovieService) { }

    @Get()
    async showMovie() {
        try {
            const movies = await this.movieService.findAll();
            return movies;
        } catch (e) {
            throw new Error("Some bad, get all");
        }
    }

    @Post()
    async saveMovie(@Body() movie: Movie) {
        try {
            const savedMovie = await this.movieService.createMovie(movie);
            return savedMovie;
        } catch (e) {
            throw new Error("Some bad while save");
        }
    }

    @Get('/:id')
    async getMovieById(@Param('id') id: number) {
        try {
            const movie = await this.movieService.findById(id);
            return movie;
        } catch (e) {
            throw new Error("Some bad, getById");
        }
    }

    @Get('title/:title')
    async getMovieByTitle(@Param('title') title: string) {
        try {
            const movie = await this.movieService.findByTitle(title);
            return movie;
        } catch (e) {
            throw new Error("Some bad, getBytitle");
        }
    }
    @Put('findById/:id')
    async updateMovie(@Body() movie: Movie, @Param("id") id: number) {
        try {
            await this.movieService.updateMovie(movie, id);
            return 'movie updated successfully'
        } catch (e) {
            throw new Error("Some bad while update");
        }
    }

    @Delete('/:id')
    async deleteMovie(@Param('id') id: number) {
        try {
            await this.movieService.remove(id);
            return 'movie deleted successfully'
        } catch (e) {
            throw new Error("Some bad while delete");
        }
    }
}


