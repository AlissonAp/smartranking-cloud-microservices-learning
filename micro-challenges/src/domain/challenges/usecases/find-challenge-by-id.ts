import { Injectable } from '@nestjs/common';
import { Challenge } from '../challenge.entity';
import { ChallengeRepository } from '../challenge.repository';
import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';
import { ChallengeId } from '../challenge.types';

@Injectable()
export class FindChallengeByIdUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(id: ChallengeId): Promise<Challenge> {
    const challenge = await this.challengeRepository.findById(id);

    if (!challenge) {
      throw new EntityNotFoundError(Challenge.name, id);
    }

    return challenge;
  }
}
