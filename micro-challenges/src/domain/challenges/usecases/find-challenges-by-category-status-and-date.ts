import { Injectable } from '@nestjs/common';
import { Challenge } from '../challenge.entity';
import { ChallengeRepository } from '../challenge.repository';
import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';
import { Status } from '../challenge.enums';

@Injectable()
export class FindChallengesByCategoryStatusAndDateUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(categoryId: string, status: Status, date: string): Promise<Challenge | Challenge[]> {
    const challenges = await this.challengeRepository.findByCategoryIdStatusAndDate(categoryId, status, date);

    if (!challenges) {
      throw new EntityNotFoundError(Challenge.name, categoryId);
    }

    return challenges;
  }
}
