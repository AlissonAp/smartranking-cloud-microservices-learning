import { Challenge } from '../challenge.entity';
import { Status } from '../challenge.enums';
import { ChallengeRepository } from '../challenge.repository';
import { ChallengeCreateDTO } from '../../../application/challenges/challenge.dto';
import { EntityIncorrectData } from 'src/domain/common/exceptions/business.exception';
import { ClientProxy } from '@nestjs/microservices';

export class CreateChallengeUseCase {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly clientNotification: ClientProxy
  ) {}

  async execute(data: ChallengeCreateDTO): Promise<Challenge> {
    if (!data.players.includes(data.requester)) {
      throw new EntityIncorrectData(Challenge.name, [
        `Challenge requester is not included into list of challenge players.`,
      ]);
    }

    const challenge = new Challenge({
      status: Status.PENDING,
      requester: data.requester,
      requestDate: new Date(),
      realizationDate: data.realizationDate,
      category: data.category,
      players: data.players,
    });

    const createdChallenge = await this.challengeRepository.create(challenge);

    this.clientNotification.emit('new-challenge-notification', { challengeId : challenge.id });

    return createdChallenge;
    
  }
}
