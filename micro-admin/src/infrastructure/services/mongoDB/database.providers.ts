import * as mongoose from 'mongoose';
import { ConfigService } from '../../config/config.service';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: (config: ConfigService): Promise<typeof mongoose> => {
      const MONGO_URL = config.get('MONGO_URL');
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      };
      return mongoose.connect(MONGO_URL, options);
    },
    inject: [ConfigService],
  },
];
