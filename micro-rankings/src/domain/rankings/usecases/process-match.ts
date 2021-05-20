import { Ranking } from '../ranking.entity';
import { RankingRepository } from '../ranking.repository';
import { MatchDTO } from '../../../application/rankings/ranking.dto';
import { EntityIncorrectData } from 'src/domain/common/exceptions/business.exception';
import { MatchId } from '../ranking.types';
import { ClientProxy } from '@nestjs/microservices';
import { EventName } from '../ranking.enum';

export class ProcessMatchUseCase {
  constructor(
    private readonly rankingRepository: RankingRepository,
    private readonly clientAdminProxy: ClientProxy
  ) {}

  async execute(id : MatchId, data: MatchDTO): Promise<void> {
    
    const category = await this.clientAdminProxy.send('find-categories', data.category).toPromise();

    const victoryEvent = category.events.find(event => event.name === EventName.VICTORY);
    const defeatEvent = category.events.find(event => event.name === EventName.DEFEAT);

    const rankingPromises = data.players.map(player => {

      const ranking  = new Ranking({
        category : category.id,
        match : id,
        challenge : data.challenge,
        player : player,
        event : player === data.def ? EventName.VICTORY : EventName.DEFEAT,
        operation : player === data.def ? victoryEvent.operation : defeatEvent.operation,
        score : player === data.def ? victoryEvent.value : defeatEvent.value,
      })

       return this.rankingRepository.create(ranking);

    })

    await Promise.all(rankingPromises);

  }
}
