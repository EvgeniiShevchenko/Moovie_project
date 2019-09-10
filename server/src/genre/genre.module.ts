import { Module } from '@nestjs/common';
import {GenreController} from "./genre.controller";
import {GenreService} from "./genre.service";
import {AppModule} from "../app.module";

// MongoDB
import { DatabaseModule } from '../database/database.module';

import { MongoProviders } from '../database/DataBaseProviders';



@Module({
  imports: [AppModule],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}