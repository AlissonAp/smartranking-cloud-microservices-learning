import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';
import { Status } from 'src/domain/micro-challenges/general.types';
import {
  IChallenge,
  IMatch,
  IMatchResult,
} from 'src/domain/micro-challenges/general.types';

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
  @IsNotEmpty()
  @IsString()
  category: string;
}

export class ChallengeUpdateDTO implements Partial<IChallenge> {
  realizationDate?: Date;
  @IsEnum([Status.ACCEPTED, Status.DENIED, Status.CANCELED])
  status: Status;
}

export class MatchCreateDTO implements Partial<IMatch> {
  @IsNotEmpty()
  def: string;
  @IsNotEmpty()
  result: Array<IMatchResult>;
}
