import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFilterDTO } from './dto/genre.dto';
import { Genre } from './interfaces/genre.interface';

@Injectable()
export class GenreService {
  constructor(@Inject('GENRE_MODEL') private readonly genreModel: Model<Genre>) {}

  async findAll(): Promise<Genre[]> {
    return await this.genreModel.find().exec();
  }
}
