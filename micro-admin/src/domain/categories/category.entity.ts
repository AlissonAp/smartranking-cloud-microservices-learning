import { v4 } from 'uuid';
import { CategoryId } from './category.types';
import { ICategory, IEvent } from './category.interfaces';
import { PlayerId } from '../players/player.types';

export class Category implements ICategory {
  readonly id: CategoryId;
  name: string;
  description: string;
  events: Array<Event>;

  constructor(props: Omit<Category, 'id'>, id?: CategoryId) {
    Object.assign(this, props);
    this.id = id ? id : v4();
  }
}

export class Event implements IEvent {
  name: string;
  operation: string;
  value: number;
  constructor(props: Event) {
    Object.assign(this, props);
  }
}
