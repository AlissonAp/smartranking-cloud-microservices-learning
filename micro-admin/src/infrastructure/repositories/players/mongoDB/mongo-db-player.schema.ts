import { Redirect } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryId } from 'src/domain/categories/category.types';
import { IPlayer } from 'src/domain/players/player.interfaces';

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
export class PlayerModel extends Document implements IPlayer {
  @Prop({ unique: true })
  id: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  ranking: string;

  @Prop()
  currentRankingPosition: number;

  @Prop()
  profileUrlPhoto: string;

  @Prop()
  category: CategoryId;
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerModel);
