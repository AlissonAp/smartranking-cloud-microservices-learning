export type ChallengeId = string;
export type MatchId = string;

export enum Status {
    FINISHED = 'FINISHED',
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DENIED = 'DENIED',
    CANCELED = 'CANCELED',
  }
  
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
    players: Array<string>;
    def: string;
    result: Array<IMatchResult>;
  }
  
  export interface IMatchResult {
    set: string;
  }
