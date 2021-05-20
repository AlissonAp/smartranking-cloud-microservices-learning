import { ChallengeId, MatchId } from './challenge.types';
import { Status } from './challenge.enums';

export interface IChallenge {
  readonly id?: ChallengeId;
  status: Status;
  requestDate: Date;
  responseDate?: Date;
  realizationDate: Date;
  requester: string;
  category: string;
  players: Array<string>;
  match?: MatchId;
}

export interface IMatch {
  readonly id?: MatchId;
  category: string;
  challenge: string;
  players: Array<string>;
  def: string;
  result: Array<IMatchResult>;
}

export interface IMatchResult {
  set: string;
}
