import { Challenge, Match } from '../challenge.entity';
import { ChallengeId } from '../challenge.types';
import { Status } from '../challenge.enums';
import { ChallengeRepository } from '../challenge.repository';
import { MatchCreateDTO } from '../../../application/challenges/challenge.dto';
import {
  EntityAlreadyExistsError,
  EntityIncorrectData,
  EntityNotFoundError,
} from 'src/domain/common/exceptions/business.exception';
import { ClientProxy } from '@nestjs/microservices';

export class AssignMatchToChallengeUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository, private readonly clientRanking: ClientProxy) {}

  async execute(id: ChallengeId, data: MatchCreateDTO): Promise<void> {

    const challenge: Challenge = await this.challengeRepository.findById(id);

    if (!challenge) {
      throw new EntityNotFoundError(Challenge.name, id);
    }

    if (!challenge.players.includes(data.def)) {
      throw new EntityIncorrectData(Challenge.name, [
        'Informed winning player is not part of the challenge',
      ]);
    }

    if (challenge.match) {
      throw new EntityAlreadyExistsError(Match.name, Challenge.name);
    }

    const match = new Match({
      def: data.def,
      category: challenge.category,
      challenge: id,
      players: challenge.players,
      result: data.result,
    });

    await this.challengeRepository.addMatch(match);

    challenge.status = Status.FINISHED;
    challenge.match = match.id;

    await this.challengeRepository.update(id, challenge);

    return await this.clientRanking.emit('process-match', { matchId : match.id, match }).toPromise()

  }
}
