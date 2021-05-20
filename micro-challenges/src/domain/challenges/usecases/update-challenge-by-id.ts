import { ChallengeId } from '../challenge.types';
import { ChallengeRepository } from '../challenge.repository';
import { ChallengeUpdateDTO } from '../../../application/challenges/challenge.dto';
import { Status } from '../challenge.enums';
import { EntityIncorrectData } from 'src/domain/common/exceptions/business.exception';

export class UpdateChallengeByIdUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(id: ChallengeId, data: ChallengeUpdateDTO): Promise<void> {
    
    const challenge = await this.challengeRepository.findById(id);
    
    if(challenge.status !== Status.PENDING){
      throw new EntityIncorrectData("Challenge", [`The challenge must be have a PENDING status for update!`])
    }

    return this.challengeRepository.update(id, data);
  }
}
