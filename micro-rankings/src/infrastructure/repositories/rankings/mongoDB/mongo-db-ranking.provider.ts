import { Connection } from 'mongoose';

import { RankingSchema } from './mongo-db-ranking.schema';

export const RankingProvider = [
  {
    provide: 'RankingModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Rankings', RankingSchema),
    inject: ['DbConnectionToken'],
  }
];
