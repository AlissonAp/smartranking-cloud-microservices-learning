import { CategoryId } from './category.types';

export interface ICategory {
  readonly id: CategoryId;
  name: string;
  description: string;
  events: Array<IEvent>;
}

export interface IEvent {
  name: string;
  operation: string;
  value: number;
}
