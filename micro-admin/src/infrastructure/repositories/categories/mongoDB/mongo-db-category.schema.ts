import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ICategory,
  IEvent,
} from '../../../../domain/categories/category.interfaces';
import { CategoryId } from '../../../../domain/categories/category.types';

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
export class CategoryModel extends Document implements ICategory {
  @Prop({ unique: true })
  id: CategoryId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  events: Array<EventModel>;

}

@Schema()
export class EventModel extends Document implements IEvent {
  @Prop()
  name: string;

  @Prop()
  operation: string;

  @Prop()
  value: number;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
