import { PlayerId } from 'src/domain/players/player.types';
import { Player } from '../../../domain/players/player.entity';
import { PlayerDBRepository } from '../../../domain/players/player.repository';

export class InMemoryPlayersRepository implements PlayerDBRepository {
  private readonly objMemory: Array<Player> = [];

  async findAll(): Promise<Player[]> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.objMemory);
      } catch (err) {
        reject(err);
      }
    });
  }

  findById(id: PlayerId): Promise<Player> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.objMemory.filter((fl) => fl.id === id)[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  findByEmail(email: string): Promise<Player> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.objMemory.filter((fl) => fl.email === email)[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  create(player: Player): Promise<Player> {
    return new Promise((resolve, reject) => {
      try {
        this.objMemory.push(player);
        resolve(player);
      } catch (err) {
        reject(err);
      }
    });
  }

  update(id: PlayerId, player: Player): void {
    throw new Error('Not implemented');
  }

  delete(id: PlayerId): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.objMemory.slice(
          this.objMemory.findIndex((fi) => fi.id === id),
          1,
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
