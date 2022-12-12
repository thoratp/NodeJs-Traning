import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param
} from '@nestjs/common';

interface Movie {
  id: number;
  title: string;
  rating: number;
  director: string;
}

@Controller('/api/v1/movies')
export class AppController {
  movies: Movie[] = [];

  constructor() {
    this.movies.push({ title: 'singham', id: 1, director: 'A', rating: 4 });
    this.movies.push({ title: 'Happy Days', id: 2, director: 'A', rating: 4.5 });
    this.movies.push({ title: 'Drishyam', id: 3, director: 'A', rating: 4.8 });
    this.movies.push({ title: 'MSD', id: 4, director: 'A', rating: 4.3 });
  }

  @Get()
  getAllMovies(): Array<Movie> {
    return this.movies;
  }
  @Post()
  saveMovie(@Body() m: Movie): Movie {
    this.movies.push({ ...m, id: this.movies.length + 1 })
    return m;
  }
  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    if (isNaN(id)) {
      throw new Error('Id is null');
    }
    this.movies.forEach((movie, index) => {
      if (movie.id == id) {
        this.movies.splice(index, 1);
      }
    })
    return this.movies;
  }
}
