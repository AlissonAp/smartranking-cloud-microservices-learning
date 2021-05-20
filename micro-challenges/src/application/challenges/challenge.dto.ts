import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';
import { Status } from 'src/domain/challenges/challenge.enums';
import {
  IChallenge,
  IMatch,
  IMatchResult,
} from 'src/domain/challenges/challenge.interfaces';

export class ChallengeCreateDTO implements Partial<IChallenge> {
  @IsNotEmpty()
  @IsDateString()
  realizationDate: Date;
  @IsNotEmpty()
  @IsString()
  requester: string;
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<string>;
  category: string;
}

export class ChallengeUpdateDTO implements Partial<IChallenge> {
  @IsNotEmpty()
  @IsDateString()
  realizationDate: Date;
  @IsEnum([Status.ACCEPTED, Status.DENIED, Status.CANCELED])
  status: Status;
}

export class MatchCreateDTO implements Partial<IMatch> {
  @IsNotEmpty()
  def: string;
  @IsNotEmpty()
  result: Array<IMatchResult>;
}
