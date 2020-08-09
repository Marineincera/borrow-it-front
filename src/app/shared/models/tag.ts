import { Item } from "./item";

export class Tag {
  id?: number;
  name: string;
  creationDate?: Date;
<<<<<<< HEAD
  items?: Array<Item>;
=======
<<<<<<< HEAD
  items: Array<Item>;
=======
  items?: Array<Item>;
>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation
>>>>>>> 36c09b6... feat: tags items and private user page creation

  constructor(tag: Tag) {
    Object.assign(tag, this);
  }
}
