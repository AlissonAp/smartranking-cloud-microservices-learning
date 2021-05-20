import { Injectable } from '@nestjs/common';
import { Challenge } from '../challenge.entity';
import { ChallengeRepository } from '../challenge.repository';

@Injectable()
export class FindAllChallengesUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(): Promise<Challenge[]> {
    return this.challengeRepository.findAll();
  }
}
