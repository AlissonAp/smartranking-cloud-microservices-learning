import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../infrastructure/services/mongoDB/database.module';
import { MongoDbPlayerDBRepository } from '../../infrastructure/repositories/players/mongoDB/mongo-db-player.repository';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { MongoDBPlayerProvider } from '../../infrastructure/repositories/players/mongoDB/mongo-db-player.provider';
import { ExceptionFilterService } from '../common/exception-filter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    ...MongoDBPlayerProvider,
    MongoDbPlayerDBRepository,
    ExceptionFilterService,
  ],
  exports: [PlayerService],
})
export class PlayersModule {}
