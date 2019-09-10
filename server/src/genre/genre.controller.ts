import { Controller, Get, Post, Body, Param, Req, Res, Request } from '@nestjs/common';
import { CreateFilterDTO } from './dto/genre.dto';
import { GenreService } from './genre.service';
import { Genre } from './interfaces/genre.interface';


@Controller('api/genre')
export class GenreController {
  constructor(private readonly mooviesService: GenreService) {}

  @Get()
  async findAll(): Promise<Genre[]> {
    return this.mooviesService.findAll();
  }
}