<<<<<<< HEAD
import { Category } from './category';
import { GameConsole } from './game-console';
import { ItemStatus } from './item-status';
import { Loan } from './loan';
import { Tag } from './tag';
import { User } from './user';
import { Evaluation } from './evaluation';

export class Item {
    id?: number;
    title: string;
    image: string;
    note?: number;
    user: User;
    category: Category;
    tags?: Array<Tag>;
    itemStatus?: ItemStatus;
    loans?: Array<Loan>;
    console?: GameConsole;
    evaluations?: Array<Evaluation>;
=======
import { Category } from "./category";
import { GameConsole } from "./game-console";
import { ItemStatus } from "./item-status";
import { Loan } from "./loan";
import { Tag } from "./tag";
import { User } from "./user";
import { Evaluation } from "./evaluation";

export class Item {
  id?: number;
  title: string;
  image: string;
  note?: number;
  user: User;
  category: Category;
  tags?: Array<Tag>;
  itemStatus?: ItemStatus;
  loans?: Array<Loan>;
  console?: GameConsole;
  evaluations?: Array<Evaluation>;
  description?: string;
>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation

  constructor(item: Item) {
    Object.assign(item, this);
  }
}
