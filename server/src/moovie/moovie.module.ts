import { Module } from '@nestjs/common';

// MongoDB
import { DatabaseModule } from '../database/database.module';

import { MongoProviders } from '../database/DataBaseProviders';

// api/moovie
import {MoovieController} from './moovies.controller';
import {MooviesService} from './moovies.service';


@Module({
  imports: [],
  controllers: [MoovieController],
  providers: [MooviesService]
})
export class MoovieModule {}