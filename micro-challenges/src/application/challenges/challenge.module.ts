import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/services/mongoDB/database.module';
import { MongoDbChallengeRepository } from '../../infrastructure/repositories/challenges/mongoDB/mongo-db-challenge.repository';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeProvider } from '../../infrastructure/repositories/challenges/mongoDB/mongo-db-challenge.provider';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';

@Module({
  imports: [DatabaseModule, ProxyRMQModule],
  controllers: [ChallengeController],
  providers: [
    ChallengeService,
    ...ChallengeProvider,
    MongoDbChallengeRepository,
    ExceptionFilterService,
  ],
  exports: [ChallengeService],
})
export class ChallengesModule {}
