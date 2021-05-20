import { Connection } from 'mongoose';

import { PlayerSchema } from './mongo-db-player.schema';

export const MongoDBPlayerProvider = [
  {
    provide: 'PlayerModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Players', PlayerSchema),
    inject: ['DbConnectionToken'],
  },
];
