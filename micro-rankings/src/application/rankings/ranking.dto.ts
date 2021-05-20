import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';
import {
  IRanking, IMatch, IMatchResult
} from 'src/domain/rankings/ranking.interfaces';

export class RankingDTO implements Partial<IRanking> {
  @IsNotEmpty()
  @IsString()
  challenge: string;
  @IsNotEmpty()
  @IsString()
  player: string;
  @IsNotEmpty()
  @IsString()
  match: string;
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsString()
  event: string;
  @IsNotEmpty()
  @IsString()
  operation: string;
  @IsNotEmpty()
  @IsString()
  score: number;
}


export class MatchDTO implements IMatch {
  @IsNotEmpty()
  def: string;
  challenge: string;
  category: string;
  players: Array<string>;
  @IsNotEmpty()
  result: Array<IMatchResult>;
}
