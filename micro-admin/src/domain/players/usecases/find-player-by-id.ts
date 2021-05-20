import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/domain/common/exceptions/business.exception';
import { Player } from '../player.entity';
import { PlayerDBRepository } from '../player.repository';
import { PlayerId } from '../player.types';

@Injectable()
export class FindPlayerByIdUseCase {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(id: PlayerId): Promise<Player> {
    const player = await this.playerDBRepository.findById(id);

    if (!player) {
      throw new EntityNotFoundError(Player.name, id);
    }

    return player;
  }
}
