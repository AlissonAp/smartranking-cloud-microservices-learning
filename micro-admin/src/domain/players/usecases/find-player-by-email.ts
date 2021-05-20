import { Injectable } from '@nestjs/common';
import { Player } from '../player.entity';
import { PlayerDBRepository } from '../player.repository';

@Injectable()
export class FindPlayerByEmailUseCase {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(email: string): Promise<Player> {
    return this.playerDBRepository.findByEmail(email);
  }
}
