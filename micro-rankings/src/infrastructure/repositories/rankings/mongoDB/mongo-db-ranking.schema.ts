import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IRanking
} from 'src/domain/rankings/ranking.interfaces';
import { RankingId } from 'src/domain/rankings/ranking.types';

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
export class RankingModel extends Document implements IRanking {
  @Prop({ unique: true })
  id: RankingId;
  @Prop()
  challenge: string;
  @Prop()
  player: string;
  @Prop()
  match: string;
  @Prop()
  category: string;
  @Prop()
  event: string;
  @Prop()
  operation: string;
  @Prop()
  score: number;
}

export const RankingSchema = SchemaFactory.createForClass(RankingModel);
