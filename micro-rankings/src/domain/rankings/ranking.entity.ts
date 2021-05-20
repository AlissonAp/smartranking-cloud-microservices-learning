import { v4 } from 'uuid';
import { RankingId } from './ranking.types';
import { IRanking,  } from './ranking.interfaces';

export class Ranking implements IRanking {
  readonly id?: RankingId;
  challenge: string;
  player: string;
  match: string;
  category: string;
  event: string;
  operation: string;
  score: number;

  constructor(props: Partial<IRanking>, id?: RankingId) {
    Object.assign(this, props);
    this.id = id ? id : v4();
  }
}
