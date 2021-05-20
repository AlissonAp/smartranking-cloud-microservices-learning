import { Injectable } from '@nestjs/common';
import { Player } from '../player.entity';
import { PlayerDBRepository } from '../player.repository';

@Injectable()
export class FindAllPlayersUseCase {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(): Promise<Player[]> {
    return this.playerDBRepository.findAll();
  }
}
