import { PlayerId } from '../player.types';
import { PlayerDBRepository } from '../player.repository';
import { Player } from '../player.entity';

export class UploadPlayerProfilePhoto {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(id: PlayerId, url: string): Promise<void> {

    const player = await this.playerDBRepository.findById(id);
    player.profileUrlPhoto = url;

    await this.playerDBRepository.update(id, player);

  }
}
