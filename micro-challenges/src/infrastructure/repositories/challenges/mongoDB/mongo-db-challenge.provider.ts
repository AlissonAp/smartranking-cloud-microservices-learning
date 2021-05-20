import { Connection } from 'mongoose';

import { ChallengeSchema, MatchSchema } from './mongo-db-challenge.schema';

export const ChallengeProvider = [
  {
    provide: 'ChallengeModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Challenges', ChallengeSchema),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'MatchModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Matches', MatchSchema),
    inject: ['DbConnectionToken'],
  },
];
