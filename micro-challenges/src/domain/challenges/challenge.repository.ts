import { Challenge, Match } from './challenge.entity';
import { Status } from './challenge.enums';
import { ChallengeId } from './challenge.types';

export interface ChallengeRepository {
  findById(id: ChallengeId): Promise<Challenge>;
  findByPlayerId(playerId: string): Promise<Challenge | Challenge[]>;
  findByCategoryIdStatusAndDate(categoryId: string, status: Status, date: string): Promise<Challenge | Challenge[]>;
  findAll(): Promise<Challenge[]>;
  create(challenge: Challenge): Promise<Challenge>;
  update(id: ChallengeId, challenge: Partial<Challenge>): void;
  delete(id: ChallengeId): void;
  addMatch(match: Match): void;
}
