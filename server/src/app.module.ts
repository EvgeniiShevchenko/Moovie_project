import { Module } from '@nestjs/common';

// MongoDB
import { DatabaseModule } from './database/database.module';

// Modules
import {MoovieModule} from "./moovie/moovie.module";
import {GenreModule} from "./genre/genre.module";

import { MongoProviders } from './database/DataBaseProviders';
// api/moovie
import {MoovieController} from './moovie/moovies.controller';
import {MooviesService} from './moovie/moovies.service';
// api/genre
import {GenreController} from "./genre/genre.controller";
import {GenreService} from "./genre/genre.service";


@Module({
  imports: [DatabaseModule],
  controllers: [MoovieController, GenreController],
  providers: [MooviesService, GenreService, ...MongoProviders],
  exports: []
})
export class AppModule {}
