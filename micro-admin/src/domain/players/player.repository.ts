import { Player } from './player.entity';
import { PlayerId } from './player.types';

export interface PlayerDBRepository {
  findById(id: PlayerId): Promise<Player>;
  findByEmail(email: string): Promise<Player>;
  findAll(): Promise<Player[]>;
  create(player: Player): Promise<Player>;
  update(id: PlayerId, player: Partial<Player>): void;
  delete(id: PlayerId): void;
}
