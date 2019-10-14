import * as mongoose from 'mongoose';
import * as config from '../config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(config.connectionUrlMongose, {
        useNewUrlParser: true,
      }),
  },
];
