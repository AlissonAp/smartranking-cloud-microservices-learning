import { PlayerId } from '../player.types';
import { PlayerDBRepository } from '../player.repository';
import { PlayerDTO } from '../../../application/players/player.dto';

export class UpdatePlayerByIdUseCase {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(id: PlayerId, data: PlayerDTO): Promise<void> {
    return this.playerDBRepository.update(id, data);
  }
}
