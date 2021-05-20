import { Injectable } from '@nestjs/common';
import { ProcessMatchUseCase } from '../../domain/rankings/usecases/process-match';
import { MongoDbRankingRepository } from '../../infrastructure/repositories/rankings/mongoDB/mongo-db-ranking.repository';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import { MatchDTO } from './ranking.dto';
import { IRankingResponse } from 'src/domain/rankings/ranking.interfaces';
import { FindRankingByCategoryUseCase } from 'src/domain/rankings/usecases/find-by-category';

@Injectable()
export class RankingService {
  private clientAdmin: ClientProxy;
  private clientChallenges: ClientProxy;

  constructor(
    private readonly rankingRepository: MongoDbRankingRepository,
    private readonly clientProxyRMQ: ProxyRMQProvider,
  ) {
    this.clientAdmin = this.clientProxyRMQ.getClientProxyAdminBackendInstance();
    this.clientChallenges = this.clientProxyRMQ.getClientProxyChallengesBackendInstance()
  }

  processMatch(matchId: string, data: MatchDTO): Promise<void> {
    const processRanking = new ProcessMatchUseCase(
      this.rankingRepository,
      this.clientAdmin,
    );

    return processRanking.execute(matchId, data);
  }

  findByCategory(categoryId: string, dateRef: string): Promise<IRankingResponse | IRankingResponse[]> {
    const findRankingByCategory = new FindRankingByCategoryUseCase(
      this.rankingRepository,
      this.clientChallenges,
    );

    return findRankingByCategory.execute(categoryId, dateRef);
  }

}
