import { Connection } from 'mongoose';
import {MoovieSchema} from './schemas/moovie.schema';

export const MongoMoovieProviders = [
  {
    provide: 'MOOVIE_MODEL',
    useFactory: (connection: Connection) => connection.model('moovis', MoovieSchema),
    inject: ['DATABASE_CONNECTION']
  }
];