import { Injectable } from '@nestjs/common';
import { Challenge } from '../challenge.entity';
import { ChallengeRepository } from '../challenge.repository';
import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';

@Injectable()
export class FindChallengesByPlayerUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(playerId: string): Promise<Challenge | Challenge[]> {
    const challenges = await this.challengeRepository.findByPlayerId(playerId);

    if (!challenges) {
      throw new EntityNotFoundError(Challenge.name, playerId);
    }

    return challenges;
  }
}
