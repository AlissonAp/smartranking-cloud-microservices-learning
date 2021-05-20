import { v4 } from 'uuid';
import { ChallengeId, MatchId } from './challenge.types';
import { IChallenge, IMatch, IMatchResult } from './challenge.interfaces';
import { Status } from './challenge.enums';

export class Challenge implements IChallenge {
  readonly id?: ChallengeId;
  status: Status;
  requestDate: Date;
  responseDate?: Date;
  realizationDate: Date;
  requester: string;
  category: string;
  players: Array<string>;
  match?: MatchId;

  constructor(props: Partial<IChallenge>, id?: ChallengeId) {
    Object.assign(this, props);
    this.id = id ? id : v4();
  }
}

export class Match implements IMatch {
  readonly id?: MatchId;
  category: string;
  challenge: string;
  players: Array<string>;
  def: string;
  result: Array<IMatchResult>;

  constructor(props: Partial<IMatch>, id?: MatchId) {
    Object.assign(this, props);
    this.id = id ? id : v4();
  }
}
