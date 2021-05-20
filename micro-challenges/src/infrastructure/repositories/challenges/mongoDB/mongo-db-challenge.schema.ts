import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IChallenge,
  IMatch,
  IMatchResult,
} from 'src/domain/challenges/challenge.interfaces';
import { Status } from 'src/domain/challenges/challenge.enums';
import { ChallengeId, MatchId } from 'src/domain/challenges/challenge.types';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class MatchModel extends Document implements IMatch {
  @Prop({ unique: true })
  id: MatchId;
  @Prop()
  category: string;
  @Prop()
  challenge: string;
  @Prop()
  players: Array<string>;
  @Prop()
  def: string;
  @Prop()
  result: Array<IMatchResult>;
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class ChallengeModel extends Document implements IChallenge {
  @Prop({ unique: true })
  id: ChallengeId;
  @Prop()
  status: Status;
  @Prop()
  requestDate: Date;
  @Prop()
  responseDate: Date;
  @Prop()
  realizationDate: Date;
  @Prop()
  requester: string;
  @Prop()
  category: string;
  @Prop()
  players: Array<string>;
  @Prop()
  match: MatchId;
}

export const ChallengeSchema = SchemaFactory.createForClass(ChallengeModel);
export const MatchSchema = SchemaFactory.createForClass(MatchModel);
