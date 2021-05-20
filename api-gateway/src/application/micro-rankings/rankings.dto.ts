import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';
import { IRankingResponseHistory } from 'src/domain/micro-rankings/general.types';

export class RankingResponseDTO {
  player?: string;
  position?: number;
  score?: number;
  history: IRankingResponseHistory;
}
