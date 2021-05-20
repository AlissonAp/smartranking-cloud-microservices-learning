import { RankingId, MatchId } from './ranking.types';

export interface IRanking {
  readonly id?: RankingId;
  challenge: string;
  player: string;
  match: string;
  category: string;
  event: string;
  operation: string;
  score: number;
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

export interface IRankingResponse {
  player?: string;
  position?: number;
  score?: number;
  history: IRankingResponseHistory;
}

export interface IRankingResponseHistory {
  victories?: number;
  defeats?: number;
}