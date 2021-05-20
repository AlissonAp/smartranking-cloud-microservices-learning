import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { ChallengeModel, MatchModel } from './mongo-db-challenge.schema';
import {
  Challenge,
  Match,
} from '../../../../domain/challenges/challenge.entity';
import { ChallengeRepository } from '../../../../domain/challenges/challenge.repository';
import { ChallengeId } from 'src/domain/challenges/challenge.types';
import { Status } from 'src/domain/challenges/challenge.enums';
import * as momentTz from 'moment-timezone';

export class MongoDbChallengeRepository implements ChallengeRepository {
  constructor(
    @Inject('ChallengeModelToken')
    private readonly challengeModel: Model<ChallengeModel>,
    @Inject('MatchModelToken')
    private readonly matchModel: Model<MatchModel>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengeModel.find().exec();
  }

  findById(id: ChallengeId): Promise<Challenge> {
    return this.challengeModel.findOne({ id }).exec();
  }

  findByPlayerId(playerId: string): Promise<Challenge | Challenge[]> {
    return this.challengeModel.find({ players: playerId }).exec();
  }

  findByCategoryIdStatusAndDate(
    categoryId: string,
    status: Status,
    date: string,
  ): Promise<Challenge | Challenge[]> {
    return this.challengeModel
      .find({
        category: categoryId,
        status,
        realizationDate: {
          $lte: momentTz(date).endOf('day').tz('UTC').toDate(),
        },
      })
      .exec();
  }

  findByName(name: string): Promise<Challenge> {
    return this.challengeModel.findOne({ name }).exec();
  }

  create(challenge: Challenge): Promise<Challenge> {
    return this.challengeModel.create(challenge);
  }

  update(id: ChallengeId, challenge: Partial<Challenge>): Promise<Challenge> {
    return this.challengeModel.findOneAndUpdate({ id }, challenge).exec();
  }

  delete(id: ChallengeId): void {
    this.challengeModel.deleteOne({ id }).exec();
  }

  addMatch(match: Match): Promise<Match> {
    return this.matchModel.create(match);
  }
}
