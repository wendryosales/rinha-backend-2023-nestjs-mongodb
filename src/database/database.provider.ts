import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://db:27017', {
        auth: {
          username: 'root',
          password: 'root',
        },
        dbName: 'nestjs',
      }),
  },
];
