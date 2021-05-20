import { v4 } from 'uuid';
import { CategoryId } from '../categories/category.types';
import { IPlayer } from './player.interfaces';
import { PlayerId } from './player.types';

export class Player implements IPlayer {
  public readonly id: PlayerId;
  public readonly phoneNumber: string;
  public readonly email: string;
  public name: string;
  public ranking: string;
  public currentRankingPosition: number;
  public profileUrlPhoto: string;
  public category: CategoryId;

  constructor(props: Omit<Player, 'id'>, id?: PlayerId) {
    Object.assign(this, props);
    this.id = id ? id : v4();
  }
}
