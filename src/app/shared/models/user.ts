import { Item } from "./item";
import { Loan } from "./loan";
import { Opinion } from "./opinion";
import { Evaluation } from "./evaluation";
import { Friendship } from "./friendship";

export class User {
  id?: number;
  avatar?: string;
  pseudo: string;
  email: string;
  password: string;
  city: string;
  registrationDate?: Date;
  walkingDelivery?: boolean;
  letterDelivery?: boolean;
  items?: Array<Item>;
  borrows?: Array<Loan>;
  loans?: Array<Loan>;
  writtenOpinions?: Array<Opinion>;
  receivedOpinions?: Array<Opinion>;
  evaluations?: Array<Evaluation>;
  friendships?: Array<Friendship>;

  constructor(user: User) {
    Object.assign(user, this);
  }
}
