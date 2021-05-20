import { Injectable } from '@nestjs/common';
import { Challenge } from '../../domain/challenges/challenge.entity';
import {
  ChallengeCreateDTO,
  ChallengeUpdateDTO,
  MatchCreateDTO,
} from 'src/application/challenges/challenge.dto';
import { ChallengeId } from 'src/domain/challenges/challenge.types';
import { FindChallengeByIdUseCase } from '../../domain/challenges/usecases/find-challenge-by-id';
import { FindChallengesByPlayerUseCase } from '../../domain/challenges/usecases/find-challenges-by-player';
import { FindAllChallengesUseCase } from '../../domain/challenges/usecases/find-all-challenges';
import { CreateChallengeUseCase } from '../../domain/challenges/usecases/create-challenge';
import { UpdateChallengeByIdUseCase } from '../../domain/challenges/usecases/update-challenge-by-id';
import { DeleteChallengeByIdUseCase } from '../../domain/challenges/usecases/delete-challenge-by-id';
import { MongoDbChallengeRepository } from '../../infrastructure/repositories/challenges/mongoDB/mongo-db-challenge.repository';
import { AssignMatchToChallengeUseCase } from 'src/domain/challenges/usecases/assign-match-to-challenge';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import { Status } from 'src/domain/challenges/challenge.enums';
import { FindChallengesByCategoryStatusAndDateUseCase } from 'src/domain/challenges/usecases/find-challenges-by-category-status-and-date';

@Injectable()
export class ChallengeService {

  private clientRanking: ClientProxy;
  private clientNotification: ClientProxy;

  constructor(
    private readonly challengeRepository: MongoDbChallengeRepository,
    private readonly clientProxyRMQ: ProxyRMQProvider
  ) {
    this.clientRanking = this.clientProxyRMQ.getClientRankingBackend();
    this.clientNotification = this.clientProxyRMQ.getClientNotificationsBackend();
  }

  findAll(): Promise<Challenge[]> {
    const findAllChallenges = new FindAllChallengesUseCase(
      this.challengeRepository,
    );
    return findAllChallenges.execute();
  }

  findById(id: ChallengeId): Promise<Challenge> {
    const findChallengeById = new FindChallengeByIdUseCase(
      this.challengeRepository,
    );
    return findChallengeById.execute(id);
  }

  findByPlayer(playerId: string): Promise<Challenge | Challenge[]> {
    const findChallengesByPlayer = new FindChallengesByPlayerUseCase(
      this.challengeRepository,
    );
    return findChallengesByPlayer.execute(playerId);
  }

  findByCategoryStatusAndDate(categoryId: string, status : Status, date: string): Promise<Challenge | Challenge[]> {
    const findChallengesByCategoryStatusAndDate = new FindChallengesByCategoryStatusAndDateUseCase(
      this.challengeRepository,
    );
    return findChallengesByCategoryStatusAndDate.execute(categoryId, status, date);
  }

  create(challenge: ChallengeCreateDTO): Promise<Challenge> {
    const createChallenge = new CreateChallengeUseCase(
      this.challengeRepository,
      this.clientNotification
    );
    return createChallenge.execute(challenge);
  }

  updateById(id: ChallengeId, challenge: ChallengeUpdateDTO): Promise<void> {
    const updateChallenge = new UpdateChallengeByIdUseCase(
      this.challengeRepository,
    );
    return updateChallenge.execute(id, challenge);
  }

  deleteById(id: ChallengeId): void {
    const deleteChallenge = new DeleteChallengeByIdUseCase(
      this.challengeRepository,
    );
    deleteChallenge.execute(id);
  }

  assignMatchToChallenge(
    id: ChallengeId,
    match: MatchCreateDTO,
  ): Promise<void> {
    const assignMatchToChallenge = new AssignMatchToChallengeUseCase(
      this.challengeRepository,
      this.clientRanking
    );
    
    return assignMatchToChallenge.execute(id, match);

  }
}
