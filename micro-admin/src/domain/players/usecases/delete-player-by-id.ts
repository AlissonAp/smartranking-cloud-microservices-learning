import { PlayerDBRepository } from '../player.repository';
import { PlayerId } from '../player.types';

export class DeletePlayerByIdUseCase {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(id: PlayerId): Promise<void> {
    return this.playerDBRepository.delete(id);
  }
}
