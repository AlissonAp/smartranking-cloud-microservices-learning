import { Ranking } from './ranking.entity';
import { RankingId } from './ranking.types';

export interface RankingRepository {
  create(ranking: Ranking): Promise<Ranking>;
  findByCategory(categoryId: string, dateRef: string) : Promise<Ranking[]>
}
