import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://admin:1234@myproject-a0qrm.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
      }),
  },
];
