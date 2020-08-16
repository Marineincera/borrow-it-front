import { Item } from "./item";
import { Loan } from "./loan";
import { Opinion } from "./opinion";
import { Evaluation } from "./evaluation";
import { FriendshipDemand } from "./friendship-demand";

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
  // friendshipsAsked?: Array<Friendship>;
  // friendshipsAnswered?: Array<Friendship>;
  friendshipDemands?: Array<FriendshipDemand>;
  friendDemandsSend?: Array<FriendshipDemand>;
  friendDemandsReceived?: Array<FriendshipDemand>;

  constructor(user: User) {
    Object.assign(user, this);
  }
}
