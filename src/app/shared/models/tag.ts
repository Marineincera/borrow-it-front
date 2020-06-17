import { Item } from "./item";

export class Tag {
  id?: number;
  name: string;
  creationDate?: Date;
  items: Array<Item>;

  constructor(tag: Tag) {
    Object.assign(tag, this);
  }
}
