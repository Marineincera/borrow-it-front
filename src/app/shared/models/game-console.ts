import { Item } from "./item";

export class GameConsole {
  id?: number;
  name!: string;
  items?: Array<Item>;

  constructor(gameConsole: GameConsole) {
    Object.assign(gameConsole, this);
  }
}
