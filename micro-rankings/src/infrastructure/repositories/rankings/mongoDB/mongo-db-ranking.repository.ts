import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { RankingModel } from './mongo-db-ranking.schema';
import {
  Ranking
} from '../../../../domain/rankings/ranking.entity';
import { RankingRepository } from '../../../../domain/rankings/ranking.repository';
import { IRankingResponse } from '../../../../domain/rankings/ranking.interfaces';
import { RankingId } from 'src/domain/rankings/ranking.types';

export class MongoDbRankingRepository implements RankingRepository {
  constructor(
    @Inject('RankingModelToken')
    private readonly rankingModel: Model<RankingModel>
  ) {}

  create(ranking: Ranking): Promise<Ranking> {
    return this.rankingModel.create(ranking);
  }

  findByCategory(categoryId: string, dateRef: string): Promise<Ranking[]>{
    return this.rankingModel.find().where('category').equals(categoryId).exec();
  } 

}
