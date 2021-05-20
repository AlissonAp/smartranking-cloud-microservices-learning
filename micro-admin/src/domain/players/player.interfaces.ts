import { CategoryId } from '../categories/category.types';
import { PlayerId } from './player.types';

export interface IPlayer {
  readonly id: PlayerId;
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  currentRankingPosition: number;
  profileUrlPhoto: string;
  category: CategoryId;
}
