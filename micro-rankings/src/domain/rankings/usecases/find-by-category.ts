import { RankingRepository } from '../ranking.repository';
import { ClientProxy } from '@nestjs/microservices';
import { IRankingResponse } from '../ranking.interfaces';
import * as _ from 'lodash';

export class FindRankingByCategoryUseCase {
  constructor(
    private readonly rankingRepository: RankingRepository,
    private readonly clientChallenges: ClientProxy,
  ) {}

  async execute(
    categoryId: string,
    dateRef: string,
  ): Promise<IRankingResponse[]> {
    const rankings = await this.rankingRepository.findByCategory(
      categoryId,
      dateRef,
    );
    const challenges = await this.clientChallenges
      .send('find-challenges', {
        categoryId: categoryId,
        challengeStatus: 'FINISHED',
        challengeDate: dateRef,
      })
      .toPromise();

    const validRankings = rankings.filter((ranking) => {
      return (
        challenges.findIndex(
          (challenge) => challenge.id === ranking.challenge,
        ) > -1
      );
    });

    const groupedValidRankings = _(validRankings)
      .groupBy('player')
      .map((items, key) => ({
        player: key,
        history: _.countBy(items, 'event'),
        score: items.reduce((p, c) => {
          return c.operation === '+' ? p + c.score : p - c.score;
        }, 0),
      }))
      .orderBy('score', 'desc')
      .value()
      .map((validRanking, idx) => ({
        ...validRanking,
        position: idx + 1,
      }));

    return groupedValidRankings;
  }
}
