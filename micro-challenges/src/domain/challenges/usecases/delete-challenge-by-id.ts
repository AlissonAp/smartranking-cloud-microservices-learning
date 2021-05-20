import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';
import { Status } from '../challenge.enums';
import { ChallengeRepository } from '../challenge.repository';
import { ChallengeId } from '../challenge.types';

export class DeleteChallengeByIdUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(id: ChallengeId): Promise<void> {
    const challenge = await this.challengeRepository.findById(id);

    if (!challenge) {
      throw new EntityNotFoundError('Chalenge', id);
    }

    challenge.status = Status.CANCELED;

    return this.challengeRepository.update(id, challenge);
  }
}
