import { Category } from "./category";
import { GameConsole } from "./game-console";
import { ItemStatus } from "./item-status";
import { Loan } from "./loan";
import { Tag } from "./tag";
import { User } from "./user";
import { Evaluation } from "./evaluation";
import { Visibility } from "../enums/visibility.enum";

export class Item {
  id?: number;
  title?: string;
  image?: string;
  note?: number;
  user?: User;
  category?: Category;
  tags?: Array<Tag>;
  itemStatus?: ItemStatus;
  loans?: Array<Loan>;
  console?: GameConsole;
  evaluations?: Array<Evaluation>;
  description?: string;
  visibility?: Visibility | string;

  constructor(item: Item) {
    Object.assign(item, this);
  }
}
