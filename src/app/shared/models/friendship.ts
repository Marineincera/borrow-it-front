import { User } from "./user";
import { FriendshipStatus } from "./friendship-status";

export class Friendship {
  id?: number;
  asker: User;
  answerer: User;
  status: FriendshipStatus;
}
