import { Connection } from 'mongoose';

import { CategorySchema } from './mongo-db-category.schema';

export const CategoryProvider = [
  {
    provide: 'CategoryModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Categories', CategorySchema),
    inject: ['DbConnectionToken'],
  },
];
