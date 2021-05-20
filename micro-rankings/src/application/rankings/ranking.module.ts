import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/services/mongoDB/database.module';
import { MongoDbRankingRepository } from '../../infrastructure/repositories/rankings/mongoDB/mongo-db-ranking.repository';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { RankingProvider } from '../../infrastructure/repositories/rankings/mongoDB/mongo-db-ranking.provider';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';

@Module({
  imports: [DatabaseModule, ProxyRMQModule],
  controllers: [RankingController],
  providers: [
    RankingService,
    ...RankingProvider,
    MongoDbRankingRepository,
    ExceptionFilterService,
  ],
  exports: [RankingService],
})
export class RankingsModule {}
