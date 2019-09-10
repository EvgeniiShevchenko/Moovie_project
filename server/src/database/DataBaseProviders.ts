import { Connection } from 'mongoose';
import {GenreSchema} from '../genre/schemas/genre.schema';
import {MoovieSchema} from '../moovie/schemas/moovie.schema';

export const MongoProviders = [
  {
    provide: 'GENRE_MODEL',
    useFactory: (connection: Connection) => connection.model('genres', GenreSchema),
    inject: ['DATABASE_CONNECTION']
  },
  {
    provide: 'MOOVIE_MODEL',
    useFactory: (connection: Connection) => connection.model('moovis', MoovieSchema),
    inject: ['DATABASE_CONNECTION']
  }
];